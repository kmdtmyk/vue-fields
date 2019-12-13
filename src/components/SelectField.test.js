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

  it('without slot', () => {
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

    expect(subject([], 'value')).toBe('value')
    expect(subject(['foo'], 'value')).toBe('value')
    expect(subject(() => [], 'value')).toBe('value')
  })


  it('with slot', () => {
    const subject = (records, value, options = {}) => {
      const wrapper = mount(Component, {
        propsData: {
          records,
          value,
          recordKey: 'id',
        },
        ...options,
      })
      const input = wrapper.find('input')
      return input.attributes().placeholder
    }

    expect(subject([{id: 1, name: 'foo'}], 1, {scopedSlots: {
      default: `<span>{{props.record.id}}. {{props.record.name}}</span>`
    }})).toBe('1. foo')
  })

})


describe('clear button', () => {

  const subject = (records, value) => {
    const wrapper = mount(Component, {
      propsData: {
        records,
        value,
      },
    })
    const clear = wrapper.find('.clear')
    return clear.exists()
  }

  it('exists', () => {
    expect(subject([], 0)).toBe(true)
    expect(subject([], 1)).toBe(true)
    expect(subject([], 'foo')).toBe(true)
  })

  it('not exists', () => {
    expect(subject([], '')).toBe(false)
    expect(subject([], null)).toBe(false)
    expect(subject([], undefined)).toBe(false)
  })

})
