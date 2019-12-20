import VueProps from './VueProps'

describe('isAsyncFunction', () => {

  it('true', () => {
    expect(VueProps.isAsyncFunction(async function(){})).toEqual(true)
    expect(VueProps.isAsyncFunction(async () => {})).toEqual(true)
  })

  it('false', () => {
    expect(VueProps.isAsyncFunction(function(){})).toEqual(false)
    expect(VueProps.isAsyncFunction(() => {})).toEqual(false)
    expect(VueProps.isAsyncFunction(1)).toEqual(false)
    expect(VueProps.isAsyncFunction('foo')).toEqual(false)
    expect(VueProps.isAsyncFunction([1, 2, 3])).toEqual(false)
    expect(VueProps.isAsyncFunction(NaN)).toEqual(false)
    expect(VueProps.isAsyncFunction(null)).toEqual(false)
    expect(VueProps.isAsyncFunction(undefined)).toEqual(false)
  })

})
