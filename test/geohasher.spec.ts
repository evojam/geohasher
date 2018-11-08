import { geohasher } from '../src/geohasher'

const geohashes = [
  ['9ytetc', [37.186, -93.257]],
  ['ezs42', [42.605, -5.603]],
  ['e', [23, -23]],
  ['ekpdue5bt', [22.999985, -22.999985]],
]

it('should decode geohash string to latlng pair', () => {
  geohashes.forEach(([geohash, latlng]) => {
    const result = geohasher.decode(geohash as string)
    expect(result).toEqual(latlng)
  })
})

it('should allow to check the geohash is even', () => {
  const geohash = '9ytetc'

  expect(geohasher.isEven(geohash)).toBeTruthy()
  expect(geohasher.isOdd(geohash)).toBeFalsy()
})

it('should allow to check the geohash is odd', () => {
  const geohash = '9ytetd'

  expect(geohasher.isOdd(geohash)).toBeTruthy()
  expect(geohasher.isEven(geohash)).toBeFalsy()
})
