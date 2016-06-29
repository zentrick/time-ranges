import TimeRange from './time-range'

const findRange = function (value, i = 0) {
  while (i < this._ranges.length && value > this._ranges[i].end) {
    ++i
  }
  return {
    index: i,
    contained: (i < this._ranges.length && value >= this._ranges[i].start)
  }
}

const isNumber = function (num) {
  return (typeof num === 'number' && !isNaN(num))
}

const isValidIndex = function (i) {
  return (isNumber(i) && i >= 0 && i < this._ranges.length)
}

export default class TimeRanges {
  constructor () {
    this._ranges = []
  }

  get length () {
    return this._ranges.length
  }

  start (i) {
    if (!isValidIndex.call(this, i)) {
      throw new Error('Invalid index')
    }
    return this._ranges[i].start
  }

  end (i) {
    if (!isValidIndex.call(this, i)) {
      throw new Error('Invalid index')
    }
    return this._ranges[i].end
  }

  add (start, end) {
    if (!isNumber(start) || !isNumber(end) || end < start) {
      throw new Error('Invalid range')
    }
    const s = findRange.call(this, start)
    const e = findRange.call(this, end, s.index)
    if (s.contained) {
      start = Math.min(start, this._ranges[s.index].start)
    }
    if (e.contained) {
      end = Math.max(end, this._ranges[e.index].end)
    }
    const len = e.index - s.index + (e.contained ? 1 : 0)
    this._ranges.splice(s.index, len, new TimeRange(start, end))
  }
}
