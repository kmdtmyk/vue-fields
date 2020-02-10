import Strings from './Strings'

describe('includes', () => {

  it('basic', () => {
    expect(Strings.includes('abcdef', 'ab')).toEqual(true)
    expect(Strings.includes('abcdef', 'AB')).toEqual(false)
    expect(Strings.includes('abcdef', '')).toEqual(false)
    expect(Strings.includes('abcdef', null)).toEqual(false)
    expect(Strings.includes('abcdef', undefined)).toEqual(false)
    expect(Strings.includes('123', 1)).toEqual(true)
    expect(Strings.includes(123, '1')).toEqual(true)
    expect(Strings.includes(null, 'u')).toEqual(false)
    expect(Strings.includes(undefined, 'u')).toEqual(false)
    expect(Strings.includes('', '')).toEqual(false)
  })

  it('ignoreCase: true', () => {
    const option = {ignoreCase: true}
    expect(Strings.includes('abcdef', 'ab', option)).toEqual(true)
    expect(Strings.includes('abcdef', 'AB', option)).toEqual(true)
  })

})

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
