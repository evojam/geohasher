# @evojam/geohasher
[![npm version](https://badge.fury.io/js/%40evojam%2Fgeohasher.svg)](https://badge.fury.io/js/%40evojam%2Fgeohasher)
[![Build Status](https://travis-ci.org/evojam/geohasher.svg?branch=master)](https://travis-ci.org/evojam/geohasher)

## Installing latest version

Using npm run `npm install --save-dev @evojam/geohasher`.

For yarn usage `yarn add -D @evojam/geohasher`.

## Installing version of choice

Using npm run `npm install --save-dev @evojam/geohasher#VERSION`.

For yarn usage `yarn add -D @evojam/geohasher#VERSION`.

Example: `npm install --save-dev @evojam/geohasher#v1.0.0` to install version `v1.0.0`.

## Usage

```typescript
import { geohasher } from '@evojam/geohasher'

geohasher.decode('9ytetc') // [37.186, -93.257]

geohasher.isEven('9ytetc') // true
geohasher.isOdd('9ytetc') // false

geohasher.isEven('9ytetd') // false
geohasher.isOdd('9ytetd') // true
```
