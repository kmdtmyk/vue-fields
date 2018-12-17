import {mount} from '@vue/test-utils'
import Component from './SelectField'

describe('dropdown-list-item length', () => {

  function subject(records){
    const wrapper = mount(Component, {
      propsData: {
        records
      }
    })
    const input = wrapper.find('input')
    wrapper.setData({inputValue: ''})
    input.trigger('input')
    return wrapper.findAll('.dropdown-list-item').length
  }

  it('array', () => {
    const records = [
      'foo',
      'bar',
      'hoge',
    ]
    expect(subject(records)).toBe(3)
  })

  it('function', () => {
    const records = () => {
      return [
        'foo',
        'bar',
        'hoge',
      ]
    }
    expect(subject(records)).toBe(3)
  })

  it('null', () => {
    const records = null
    expect(subject(records)).toBe(0)
  })

})
