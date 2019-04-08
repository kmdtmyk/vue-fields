import NumberUtil from './NumberUtil'

describe('format', () => {

  function subject(value){
    return NumberUtil.format(value)
  }

  it('number', () => {
    expect(subject(123456789)).toBe('123,456,789')
    expect(subject(0.123456789)).toBe('0.123456789')
  })

  it('string', () => {
    expect(subject('123456789')).toBe('123,456,789')
    expect(subject('not a number')).toBeNull()
  })

  it('null', () => {
    expect(subject(null)).toBeNull()
  })

  it('undefined', () => {
    expect(subject(undefined)).toBeNull()
  })

})
