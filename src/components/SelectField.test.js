import {mount} from '@vue/test-utils'
import Component from './SelectField'

describe.skip('dropdown-list-item length', () => {

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

describe('placeholder', () => {

  const subject = (records, value) => {
    const wrapper = mount(Component, {
      propsData: {
        records,
        value,
      },
    })
    const input = wrapper.find('input')
    return input.attributes().placeholder
  }

  it('without slot', () => {
    expect(subject([], 'value')).toBe('value')
    expect(subject(['foo'], 'value')).toBe('value')
    expect(subject(() => [], 'value')).toBe('value')
  })

})
