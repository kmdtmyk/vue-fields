import VueAttrs from './VueAttrs'

describe('readonly', () => {

  it('true', () => {
    expect(VueAttrs.readonly({readonly: true})).toEqual(true)
    expect(VueAttrs.readonly({readonly: ''})).toEqual(true)
    expect(VueAttrs.readonly({readonly: 'readonly'})).toEqual(true)
    expect(VueAttrs.readonly({readonly: 'on'})).toEqual(true)
    expect(VueAttrs.readonly({readonly: 'off'})).toEqual(true)
    expect(VueAttrs.readonly({readonly: 0})).toEqual(true)
    expect(VueAttrs.readonly({readonly: 1})).toEqual(true)
    expect(VueAttrs.readonly({readonly: NaN})).toEqual(true)
  })

  it('false', () => {
    expect(VueAttrs.readonly({})).toEqual(false)
    expect(VueAttrs.readonly({readonly: false})).toEqual(false)
    expect(VueAttrs.readonly({readonly: null})).toEqual(false)
    expect(VueAttrs.readonly({readonly: undefined})).toEqual(false)
  })

})
