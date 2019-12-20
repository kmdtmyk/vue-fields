import Strings from './Strings'

describe('isEmpty', () => {

  it('true', () => {
    expect(Strings.isEmpty('')).toEqual(true)
    expect(Strings.isEmpty(null)).toEqual(true)
    expect(Strings.isEmpty(undefined)).toEqual(true)
  })

  it('false', () => {
    expect(Strings.isEmpty('foo')).toEqual(false)
    expect(Strings.isEmpty('0')).toEqual(false)
    expect(Strings.isEmpty(' ')).toEqual(false)
  })

})

describe('toUpperCaseFirst', () => {

  it('string', () => {
    expect(Strings.toUpperCaseFirst('')).toEqual('')
    expect(Strings.toUpperCaseFirst('abc')).toEqual('Abc')
  })

  it('invalid value', () => {
    expect(Strings.toUpperCaseFirst(null)).toEqual(null)
    expect(Strings.toUpperCaseFirst(undefined)).toEqual(undefined)
  })

})
