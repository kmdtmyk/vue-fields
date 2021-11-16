import {mount} from '@vue/test-utils'
import Component from './SelectField'

import flushPromises from 'flush-promises'

describe('name', () => {

  it('with value', () => {
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

  it('without value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBeUndefined()
    await wrapper.vm.select('abc')
    expect(hidden.attributes().value).toBe('abc')
  })

  it('record-key', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        recordKey: 'id',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBeUndefined()
    await wrapper.vm.select({id: 1, name: 'abc'})
    expect(hidden.attributes().value).toBe('1')
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

describe('input class', () => {

  it('attribute', () => {

    const subject = inputClass => {
      const wrapper = mount(Component, {
        propsData: {
          inputClass,
          value: 'abc',
        }
      })
      const input = wrapper.find('input[type=text]')
      return input.attributes().class
    }

    expect(subject('foo bar')).toEqual('foo bar')
    expect(subject(['foo', 'baz'])).toEqual('foo baz')
    expect(subject({foo: true, bar: false, hoge: true})).toEqual('foo hoge')
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

})

describe('placeholder', () => {

  it('attribute', () => {
    const subject = (value, placeholder) => {
      const wrapper = mount(Component, {
        propsData: {
          value,
          placeholder,
        },
      })
      const input = wrapper.find('input')
      return input.attributes().placeholder
    }

    expect(subject(null, 'foo')).toBe('foo')
    expect(subject('', 'foo')).toBe('foo')
    expect(subject(0, 'foo')).toBe('0')
    expect(subject('', '')).toBe('')
    expect(subject('', null)).toBe(undefined)
  })

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
    const subject = (value, asyncWait = null) => {
      const records = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
      ]

      const wrapper = mount(Component, {
        propsData: {
          records,
          value,
          recordKey: 'id',
          asyncWait,
        },
        scopedSlots: {
          default: '<div>{{props.record.id}}. {{props.record.name}}</div>'
        },
      })
      const input = wrapper.find('input')
      return input.attributes().placeholder
    }

    expect(subject(1)).toBe('1. foo')
    expect(subject(2, 100)).toBe('2')
  })

  it('with record', () => {
    const wrapper = mount(Component, {
      propsData: {
        recordKey: 'id',
        value: 1,
        record: {id: 1, name: 'foo'},
      },
      scopedSlots: {
        default: '<div>{{props.record.id}}. {{props.record.name}}</div>'
      },
    })
    const input = wrapper.find('input')
    expect((input.attributes().placeholder)).toEqual('1. foo')
  })

  it('update props value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        recordKey: 'id',
        records: [
          {id: 1, name: 'foo'},
        ],
      },
      scopedSlots: {
        default: '<div>{{props.record.id}}. {{props.record.name}}</div>'
      },
    })

    await flushPromises()

    const input = wrapper.find('input')
    expect(input.attributes().placeholder).toBeUndefined()
    await wrapper.setProps({value: 1})
    expect(input.attributes().placeholder).toEqual('1. foo')
    await wrapper.setProps({value: 0})
    expect(input.attributes().placeholder).toEqual('0')
    await wrapper.setProps({value: null})
    expect(input.attributes().placeholder).toBeUndefined()
  })

})

describe('required', () => {

  it('input attribute', () => {

    const subject = (required, value) => {

      const wrapper = mount(Component, {
        propsData: {
          required,
          value,
        },
      })
      const input = wrapper.find('input')
      return input.attributes().required
    }

    expect(subject(true, null)).toEqual('required')
    expect(subject(true, 'foo')).toBeUndefined()
    expect(subject(false, null)).toBeUndefined()
    expect(subject(false, 'foo')).toBeUndefined()
    expect(subject('required', null)).toEqual('required')
    expect(subject('required', 'foo')).toBeUndefined()
  })

})

describe('clear button', () => {

  const subject = async (records, value) => {
    const wrapper = mount(Component, {
      propsData: {
        records,
        value,
      },
    })
    await wrapper.vm.$nextTick()
    const clear = wrapper.find('.clear')
    return clear.exists()
  }

  it('exists', async () => {
    expect(await subject([], 0)).toBe(true)
    expect(await subject([], 1)).toBe(true)
    expect(await subject([], 'foo')).toBe(true)
  })

  it('not exists', async () => {
    expect(await subject([], '')).toBe(false)
    expect(await subject([], null)).toBe(false)
    expect(await subject([], undefined)).toBe(false)
  })

})

describe('key event', () => {

  describe('delete', () => {

    it('emit null when value is present', async () => {
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
      await input.trigger('keydown.delete')
      expect(wrapper.emitted().input[0]).toEqual([null])
      await wrapper.setProps({value: wrapper.emitted().input[0][0]})
      expect(input.attributes().placeholder).toBeUndefined()
    })

    it('not emit when value is null', async () => {
      const records = [
        {id: 1, name: 'foo'}
      ]
      const wrapper = mount(Component, {
        propsData: {
          records,
          value: null,
          recordKey: 'id'
        },
      })
      const input = wrapper.find('input[type=text]')
      expect(wrapper.vm.selectedRecord).toBeNull()
      await input.trigger('keydown.delete')
      expect(wrapper.vm.selectedRecord).toBeNull()
      expect(wrapper.emitted().input).toBeUndefined()
    })

  })

})

describe('dropdown list', () => {

  describe('length', () => {

    const subject = async (records) => {
      const wrapper = mount(Component, {
        propsData: {
          records
        }
      })
      const input = wrapper.find('input')
      await input.trigger('input')
      return wrapper.findAll('.dropdown-list-item').length
    }

    it('array', async () => {
      const records = [
        '',
        'foo',
        'bar',
        'hoge',
      ]
      expect(await subject(records)).toBe(4)
    })

    it('function', async () => {
      const records = () => {
        return [
          'foo',
          'bar',
          'hoge',
        ]
      }
      expect(await subject(records)).toBe(3)
    })

    it('null', async () => {
      const records = null
      expect(await subject(records)).toBe(0)
    })

  })

  describe('empty', () => {

    it('slot exists', async () => {
      const subject = async (inputValue) => {
        const records = [
          'foo',
          'bar',
          'hoge',
        ]
        const wrapper = mount(Component, {
          propsData: {
            records,
          },
          scopedSlots: {
            empty(){
              return 'empty message'
            }
          },
        })
        const input = wrapper.find('input[type=text]')
        await input.trigger('focus')
        await wrapper.setData({inputValue})
        return wrapper.find('.dropdown-list-item.empty')
      }

      expect((await subject('')).exists()).toEqual(false)
      expect((await subject('f')).exists()).toEqual(false)
      expect((await subject('zzz')).exists()).toEqual(true)
    })

    it('slot not exists', () => {
      const subject = (inputValue) => {
        const records = [
          'foo',
          'bar',
          'hoge',
        ]
        const wrapper = mount(Component, {
          propsData: {
            records,
          },
        })
        const input = wrapper.find('input[type=text]')
        input.trigger('focus')
        wrapper.setData({inputValue})
        return wrapper.find('.dropdown-list-item.empty')
      }

      expect(subject('').exists()).toEqual(false)
      expect(subject('f').exists()).toEqual(false)
      expect(subject('zzz').exists()).toEqual(false)
    })

  })

  it('use &nbsp; if text is empty', async () => {

    const wrapper = mount(Component, {
      propsData: {
        records: [
          '',
        ],
      },
    })
    const input = wrapper.find('input[type=text]')
    await input.trigger('focus')
    expect(wrapper.find('.dropdown-list-item').element.innerHTML).toEqual('&nbsp;')

  })

})

describe('select', () => {

  it('string', () => {
    const wrapper = mount(Component)
    wrapper.vm.select('foo')
    expect(wrapper.emitted('input')[0]).toEqual(['foo'])
  })

  it('records is null', () => {
    const wrapper = mount(Component, {
      propsData: {
        records: null,
      },
    })
    wrapper.vm.select('foo')
    expect(wrapper.emitted('input')[0]).toEqual(['foo'])
  })

  it('emit update:record if record key exists', () => {
    const wrapper = mount(Component, {
      propsData: {
        recordKey: 'id',
      },
    })
    wrapper.vm.select({id: 1, name: 'foo'})
    expect(wrapper.emitted('input')[0]).toEqual([1])
    expect(wrapper.emitted('update:record')[0]).toEqual([{id: 1, name: 'foo'}])
  })

})

describe('asyncRecords', () => {

  it('store async records result, and clear it when props changed', async () => {
    const wrapper = mount(Component, {
      propsData: {
        records: async () => {
          return ['foo', 'bar']
        },
        asyncWait: 0,
      }
    })
    const input = wrapper.find('input[type=text]')
    await input.trigger('focus')
    expect(wrapper.vm.$data.asyncRecords).toEqual(['foo', 'bar'])
    await wrapper.setProps({
      records: async () => {
        return ['hoge']
      }
    })
    expect(wrapper.vm.$data.asyncRecords).toBeNull()
  })

})
