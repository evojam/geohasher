import { identity } from 'fp-ts/lib/Identity'
import { toBase32 } from './base32'

type Interval = [number, number]
type LatLng = [number, number]

export type Geohash = String
export type GeohashBounds = [LatLng, LatLng]

const BITS = [16, 8, 4, 2, 1]
const LAT_INTERVAL: Interval = [-90.0, 90.0]
const LNG_INTERVAL: Interval = [-180.0, 180.0]

const toBinary = (decimal: number): boolean[] =>
  BITS.map(mask => decimal & mask).map(Boolean)

const half = (interval: Interval): number =>
  (interval[0] + interval[1]) / 2

const refineInterval = (interval: Interval, getUpperRange: boolean): LatLng =>
  getUpperRange
    ? [half(interval), interval[1]]
    : [interval[0], half(interval)]

const round = (interval: Interval, value: number) =>
  identity.of(interval)
    .map(([min, max]) => max - min)
    .map(Math.log)
    .map(log => 2 - log / Math.LN10)
    .map(Math.floor)
    .map(precision => value.toFixed(precision))
    .map(Number)
    .extract()

const getBounds = (geohash: Geohash): GeohashBounds => {
  const binary = geohash
    .split('')
    .map(toBase32)
    .map(toBinary)
    .reduce((acc, arr) => [...acc, ...arr], [])

  const even = binary.filter((_, i) => i % 2 === 1)
  const odd = binary.filter((_, i) => i % 2 === 0)

  const [latMin, latMax] = even.reduce(refineInterval, LAT_INTERVAL)
  const [lngMin, lngMax] = odd.reduce(refineInterval, LNG_INTERVAL)

  return [
    [latMin, lngMin],
    [latMax, lngMax],
  ]
}

const decode = (geohash: Geohash): LatLng => {
  const bounds = getBounds(geohash)

  const latInterval: Interval = [bounds[0][0], bounds[1][0]]
  const lngInterval: Interval = [bounds[0][1], bounds[1][1]]

  return [
    round(latInterval, half(latInterval)),
    round(lngInterval, half(lngInterval))
  ]
}
const isOdd = (geohash: Geohash): boolean =>
  identity.of(geohash)
    .map(hash => hash.substr(hash.length - 1, 1))
    .map(toBase32)
    .map(decimal => toBinary(decimal).map(Number))
    .map(chars => chars.join(''))
    .map(Number)
    .map(binary => binary % 2 === 0)
    .extract()

const isEven = (geohash: Geohash): boolean => !isOdd(geohash)

export const geohasher = {
  decode,
  isOdd,
  isEven,
}
