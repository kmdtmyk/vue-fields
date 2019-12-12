import Arrays from './Arrays'

describe('from', () => {

  function subject(...args){
    return Arrays.from(...args)
  }

  it('array', () => {
    expect(subject([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('function', () => {
    expect(subject(() => [1, 2, 3])).toEqual([1, 2, 3])
  })

})
