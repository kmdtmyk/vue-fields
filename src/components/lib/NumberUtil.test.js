import NumberUtil from './NumberUtil'

describe('format', () => {

  function subject(value, options){
    return NumberUtil.format(value, options)
  }

  it('number', () => {
    expect(subject(123456789)).toBe('123,456,789')
    expect(subject(0.123456789)).toBe('0.123456789')
  })

  it('string', () => {
    expect(subject('123456789')).toBe('123,456,789')
    expect(subject('not a number')).toBeNull()
  })

  it('precision', () => {
    expect(subject(0.124, {precision: 2})).toBe('0.12')
    expect(subject(0.125, {precision: 2})).toBe('0.13')
    expect(subject(123.45, {precision: 0})).toBe('123')
  })

  it('null', () => {
    expect(subject(null)).toBeNull()
  })

  it('undefined', () => {
    expect(subject(undefined)).toBeNull()
  })

})
