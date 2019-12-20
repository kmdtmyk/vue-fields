import {mount} from '@vue/test-utils'
import Component from './TextField'
import Vue from 'vue'

describe('name', () => {

  it('has name attribute', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: 'bar',
      }
    })
    const input = wrapper.find('input[type=text]')
    expect(input.attributes().name).toBe('foo')
  })

})

describe('input class', () => {

  it('attribute', () => {

    const subject = inputClass => {
      const wrapper = mount(Component, {
        propsData: {
          inputClass,
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

describe('attributes', () => {

  it('readonly', () => {
    const wrapper = mount(Component, {
      propsData: {
        readonly: true,
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes().readonly).toEqual('readonly')
  })

  it('disabled', () => {
    const wrapper = mount(Component, {
      propsData: {
        disabled: true,
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes().disabled).toEqual('disabled')
  })

})

describe('input', () => {

  it('string', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 'foo',
      }
    })
    const input = wrapper.find('input')
    input.trigger('input')
    expect(wrapper.emitted('input')[0]).toEqual(['foo'])
  })

  it('empty', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '',
      }
    })
    const input = wrapper.find('input')
    input.trigger('input')
    expect(wrapper.emitted('input')[0]).toEqual([''])
  })

  it('null', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: null,
      }
    })
    const input = wrapper.find('input')
    input.trigger('input')
    expect(wrapper.emitted('input')[0]).toEqual([''])
  })

})

describe('autocomplete', () => {

  describe('attribute', () => {

    const subject = (autocomplete) => {
      const wrapper = mount(Component, {
        propsData: {
          autocomplete,
        }
      })
      const input = wrapper.find('input')
      return input.attributes().autocomplete
    }

    it('on', () => {
      expect(subject(true)).toEqual('on')
      expect(subject('on')).toEqual('on')
    })

    it('off', () => {
      expect(subject(false)).toEqual('off')
      expect(subject('off')).toEqual('off')
      expect(subject(['foo', 'bar'])).toEqual('off')
      expect(subject(() => ['foo', 'bar'])).toEqual('off')
    })

    it('undefined', () => {
      expect(subject(null)).toBeUndefined()
      expect(subject(undefined)).toBeUndefined()
    })

  })

  describe('dropdown', () => {

    it('array', (done) => {
      const array = ['foo', 'bar']
      const wrapper = mount(Component, {
        propsData: {
          autocomplete: array,
        }
      })
      const input = wrapper.find('input')
      input.trigger('focus')

      Vue.nextTick(() => {
        const dropdownListTexts = wrapper.findAll('.dropdown-list-item').wrappers.map(wrapper => wrapper.text())
        expect(dropdownListTexts).toEqual(array)
        done()
      })
    })

  })

})
