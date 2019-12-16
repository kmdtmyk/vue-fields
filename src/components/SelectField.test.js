import {mount} from '@vue/test-utils'
import Component from './SelectField'

describe('name', () => {

  it('has hidden field', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: 'bar',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('bar')
  })

})

describe('autocomplete', () => {

  it('force off', () => {
    const wrapper = mount(Component, {
      propsData: {
        autocomplete: 'on',
      }
    })
    const input = wrapper.find('input[type=text]')
    expect(input.attributes().autocomplete).toBe('off')
  })

})

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

describe('value', () => {

  it('string', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 'foo',
      },
    })
    expect(wrapper.vm.value).toEqual('foo')
    expect(wrapper.emitted().input).toBeUndefined()
  })

  it('object', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: {id: 1, name: 'foo'},
      },
    })
    expect(wrapper.vm.value).toEqual({id: 1, name: 'foo'})
    expect(wrapper.emitted().input).toBeUndefined()
  })

  it('object and record key', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: {id: 1, name: 'foo'},
        recordKey: 'id',
      },
    })
    expect(wrapper.emitted().input[0]).toEqual([1])
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

describe('key event', () => {

  describe('delete', () => {

    it('emit null when value is present', () => {
      const records = [
        {id: 1, name: 'foo'}
      ]
      const value = 1
      const wrapper = mount(Component, {
        propsData: {
          records,
          value,
          recordKey: 'id'
        },
        scopedSlots: {
          default: '<span>{{props.record.id}}. {{props.record.name}}</span>',
        },
      })
      const input = wrapper.find('input[type=text]')
      expect(input.attributes().placeholder).toEqual('1. foo')
      input.trigger('keydown.delete')
      expect(wrapper.emitted().input[0]).toEqual([null])
      wrapper.setProps({value: wrapper.emitted().input[0][0]})
      expect(input.attributes().placeholder).toBeUndefined()
    })

    it('not emit when value is null', () => {
      const records = [
        {id: 1, name: 'foo'}
      ]
      const wrapper = mount(Component, {
        propsData: {
          records,
          value: null,
          recordKey: 'id'
        },
        scopedSlots: {
          default: '<span>{{props.record.id}}. {{props.record.name}}</span>',
        },
      })
      const input = wrapper.find('input[type=text]')
      expect(wrapper.vm.selectedRecord).toBeNull()
      input.trigger('keydown.delete')
      expect(wrapper.vm.selectedRecord).toBeNull()
      expect(wrapper.emitted().input).toBeUndefined()
    })

  })

})
