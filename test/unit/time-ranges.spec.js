import TimeRanges from '../../src/index'
import TimeRange from '../../src/time-range'

describe('TimeRanges', function () {
  let tr

  beforeEach(function () {
    tr = new TimeRanges()
  })

  const add = (start, end) => {
    tr.add(start, end)
  }

  const serialize = (ranges) => ranges.map(({start, end}) => `${start}→${end}`).join(' ')

  const verify = (...ranges) => {
    const expected = serialize(ranges.map(([start, end]) => new TimeRange(start, end)))
    const actual = serialize(tr._ranges)
    expect(actual).to.eql(expected)
  }

  describe('#length', function () {
    it('is 0 by default', function () {
      expect(tr.length).to.equal(0)
    })

    it('increases after adding', function () {
      add(1, 2)
      expect(tr.length).to.equal(1)
    })
  })

  for (const fn of ['start', 'end']) {
    describe(`#${fn}()`, function () {
      it('throws if index is not a number', function () {
        expect(() => {
          tr[fn](NaN)
        }).to.throw(Error)
      })

      it('throws for negative numbers', function () {
        expect(() => {
          tr[fn](-1)
        }).to.throw(Error)
      })

      it('throws on out-of-range index', function () {
        add(1, 2)
        expect(() => {
          tr[fn](1)
        }).to.throw(Error)
      })

      it(`returns the ${fn} of the range`, function () {
        add(1, 2)
        expect(tr[fn](0)).to.equal((fn === 'start') ? 1 : 2)
      })
    })
  }

  describe('#add()', function () {
    it('throws if start is not a number', function () {
      expect(function () {
        add(NaN, 1)
      }).to.throw(Error)
    })

    it('throws if end is not a number', function () {
      expect(function () {
        add(1, NaN)
      }).to.throw(Error)
    })

    it('throws if end < start', function () {
      expect(function () {
        add(2, 1)
      }).to.throw(Error)
    })

    it('adds to empty', function () {
      add(1, 2)
      verify([1, 2])
    })

    it('appends at end', function () {
      add(1, 2)
      add(3, 4)
      verify([1, 2], [3, 4])
    })

    it('inserts at start', function () {
      add(3, 4)
      add(1, 2)
      verify([1, 2], [3, 4])
    })

    it('splices', function () {
      add(1, 2)
      add(5, 6)
      add(3, 4)
      verify([1, 2], [3, 4], [5, 6])
    })

    it('ignores identical', function () {
      add(1, 2)
      add(1, 2)
      verify([1, 2])
    })

    it('ignores existing', function () {
      add(1, 5)
      add(2, 4)
      verify([1, 5])
    })

    it('extends at start', function () {
      add(3, 5)
      add(6, 7)
      add(1, 5)
      verify([1, 5], [6, 7])
    })

    it('extends at end', function () {
      add(1, 3)
      add(6, 7)
      add(3, 5)
      verify([1, 5], [6, 7])
    })

    it('merges multiple', function () {
      add(1, 2)
      add(3, 4)
      add(5, 6)
      add(1, 6)
      verify([1, 6])
    })

    it('extends at start and end', function () {
      add(1, 2)
      add(3, 4)
      add(5, 6)
      add(0, 7)
      verify([0, 7])
    })
  })
})
