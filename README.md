# time-ranges

[![npm](https://img.shields.io/npm/v/time-ranges.svg)](https://www.npmjs.com/package/time-ranges) [![Dependencies](https://img.shields.io/david/zentrick/time-ranges.svg)](https://david-dm.org/zentrick/time-ranges) [![Build Status](https://img.shields.io/travis/zentrick/time-ranges/master.svg)](https://travis-ci.org/zentrick/time-ranges) [![Coverage Status](https://img.shields.io/coveralls/zentrick/time-ranges/master.svg)](https://coveralls.io/r/zentrick/time-ranges) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Standalone implementation of the HTML5 Media [`TimeRanges` interface](https://developers.whatwg.org/the-video-element.html#time-ranges). Always normalized.

## Installation

```bash
npm i --save time-ranges
```

## Usage

```js
import TimeRanges from 'time-ranges'

const timeRanges = new TimeRanges()

timeRanges.add(1, 2)
timeRanges.add(3, 4)

for (let i = 0; i < timeRanges.length; ++i) {
  const start = timeRanges.start(i)
  const end = timeRanges.end(i)
  console.log(`Range ${i}: ${start} → ${end}`)
}

// Output:
// Range 0: 1 → 2
// Range 1: 3 → 4
```

## Maintainer

[Tim De Pauw](https://tmdpw.eu/)

## License

MIT
