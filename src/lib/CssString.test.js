import CssString from './CssString'

describe('parse', () => {

  it('basic', () => {
    expect(CssString.parse('color:red')).toEqual({color: 'red'})
    expect(CssString.parse('color:red;')).toEqual({color: 'red'})
    expect(CssString.parse('font-size:14px;')).toEqual({'font-size': '14px'})
  })

  it('trim', () => {
    expect(CssString.parse(' color : red ; ')).toEqual({color: 'red'})
  })

  it('empty', () => {
    expect(CssString.parse('')).toEqual({})
  })

  it('ignore invalid value', () => {
    expect(CssString.parse('invalid')).toEqual({})
    expect(CssString.parse('color:red;invalid')).toEqual({color: 'red'})
  })

})
