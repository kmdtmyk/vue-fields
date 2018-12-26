import Parser from './Parser'

describe('parseInt', () => {

  function subject(value){
    return Parser.parseInt(value)
  }

  it('number', () => {
    expect(subject(0)).toBe(0)
    expect(subject(1)).toBe(1)
    expect(subject(-1)).toBe(-1)
    expect(subject(1.123)).toBe(1)
  })

  it('string', () => {
    expect(subject('123')).toBe(123)
    expect(subject('-123')).toBe(-123)
    expect(subject('１２３')).toBe(123)
    expect(subject('123.45')).toBe(123)
    expect(subject('123abc456')).toBe(123456)

    expect(subject('')).toBeNull()
    expect(subject('not a number')).toBeNull()
  })

  it('boolean', () => {
    expect(subject(true)).toBe(1)
    expect(subject(false)).toBe(0)
  })

  it('null', () => {
    expect(subject(null)).toBeNull()
  })

  it('undefined', () => {
    expect(subject(undefined)).toBeNull()
  })

})
