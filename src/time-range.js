export default class TimeRange {
  constructor (start, end) {
    this._start = start
    this._end = end
  }

  get start () {
    return this._start
  }

  get end () {
    return this._end
  }
}
