import {mount} from '@vue/test-utils'
import Component from './SelectField'

describe('select-field-item length', () => {

  function subject(records){
    const wrapper = mount(Component, {
      propsData: {
        records
      }
    })
    const input = wrapper.find('input')
    wrapper.setData({inputValue: ''})
    input.trigger('input')
    return wrapper.findAll('.select-field-item').length
  }

  it('array', () => {
    const records = [
      'foo',
      'bar',
      'hoge',
    ]
    expect(subject(records)).toBe(3)
  })

  it('null', () => {
    const records = null
    expect(subject(records)).toBe(0)
  })

})

