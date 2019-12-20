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

describe('toOnOff', () => {

  it('on', () => {
    expect(VueProps.toOnOff('on')).toEqual('on')
    expect(VueProps.toOnOff(true)).toEqual('on')
  })

  it('off', () => {
    expect(VueProps.toOnOff('off')).toEqual('off')
    expect(VueProps.toOnOff(false)).toEqual('off')
  })

  it('null', () => {
    expect(VueProps.toOnOff('foo')).toBeNull()
    expect(VueProps.toOnOff(null)).toBeNull()
    expect(VueProps.toOnOff(undefined)).toBeNull()
  })

})
