import NumberUtil from './NumberUtil'

describe('clamp', () => {

  function subject(...args){
    return NumberUtil.clamp(...args)
  }

  it('min < max', () => {
    const min = 0
    const max = 100
    expect(subject(-1, min, max)).toBe(0)
    expect(subject(0, min, max)).toBe(0)
    expect(subject(50, min, max)).toBe(50)
    expect(subject(100, min, max)).toBe(100)
    expect(subject(101, min, max)).toBe(100)
    expect(subject(null, min, max)).toBe(null)
  })

  it('min > max', () => {
    const min = 100
    const max = 0
    expect(subject(-1, min, max)).toBe(0)
    expect(subject(0, min, max)).toBe(0)
    expect(subject(50, min, max)).toBe(0)
    expect(subject(100, min, max)).toBe(0)
    expect(subject(101, min, max)).toBe(0)
    expect(subject(null, min, max)).toBe(null)
  })

  it('min is null', () => {
    const min = null
    const max = 100
    expect(subject(-1, min, max)).toBe(-1)
    expect(subject(0, min, max)).toBe(0)
    expect(subject(50, min, max)).toBe(50)
    expect(subject(100, min, max)).toBe(100)
    expect(subject(101, min, max)).toBe(100)
    expect(subject(null, min, max)).toBe(null)
  })

  it('max is null', () => {
    const min = 0
    const max = null
    expect(subject(-1, min, max)).toBe(0)
    expect(subject(0, min, max)).toBe(0)
    expect(subject(50, min, max)).toBe(50)
    expect(subject(100, min, max)).toBe(100)
    expect(subject(101, min, max)).toBe(101)
    expect(subject(null, min, max)).toBe(null)
  })

  it('min and max null', () => {
    const min = null
    const max = null
    expect(subject(-1, min, max)).toBe(-1)
    expect(subject(0, min, max)).toBe(0)
    expect(subject(50, min, max)).toBe(50)
    expect(subject(100, min, max)).toBe(100)
    expect(subject(101, min, max)).toBe(101)
    expect(subject(null, min, max)).toBe(null)
  })

})

describe('format', () => {

  function subject(...args){
    return NumberUtil.format(...args)
  }

  it('number', () => {
    expect(subject(123456789)).toBe('123,456,789')
    expect(subject(0.123456789)).toBe('0.123456789')
  })

  it('string', () => {
    expect(subject('123456789')).toBe('123,456,789')
    expect(subject('not a number')).toBeNull()
  })

  it('delimiter', () => {
    expect(subject(123456789, {delimiter: true})).toBe('123,456,789')
    expect(subject(123456789, {precision: false})).toBe('123,456,789')
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


describe('round', () => {

  function subject(...args){
    return NumberUtil.round(...args)
  }

  it('number', () => {
    expect(subject(123.454, 2)).toBe(123.45)
    expect(subject(123.455, 2)).toBe(123.46)
  })

  it('string', () => {
    expect(subject('123.454', 2)).toBe(123.45)
    expect(subject('123.455', 2)).toBe(123.46)
  })

  it('precision is null', () => {
    expect(subject(123, null)).toBe(123)
    expect(subject(123.456, null)).toBe(123.456)
  })

  it('null', () => {
    expect(subject(null)).toBeNull()
  })

  it('undefined', () => {
    expect(subject(undefined)).toBeNull()
  })

})
