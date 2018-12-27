import {shallowMount, mount} from '@vue/test-utils'
import Component from './TextField'

describe('attributes', () => {

  it('readonly', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        readonly: true,
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes().readonly).toEqual('readonly')
  })

  it('disabled', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        disabled: true,
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes().disabled).toEqual('disabled')
  })

})

describe('input', () => {

  describe('multiple: false', () => {

    it('string', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: 'foo',
        }
      })
      const input = wrapper.find('input')
      input.trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual(['foo'])
    })

    it('empty', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: '',
        }
      })
      const input = wrapper.find('input')
      input.trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual([''])
    })

    it('null', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: null,
        }
      })
      const input = wrapper.find('input')
      input.trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual([''])
    })

  })

  describe('multiple: true', () => {

    it('string', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: 'foo',
          multiple: true,
        }
      })
      const inputs = wrapper.findAll('input')
      expect(inputs.length).toBe(2)
      inputs.at(0).trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual([['foo']])
    })

    it('array', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: ['foo'],
          multiple: true,
        }
      })
      const inputs = wrapper.findAll('input')
      expect(inputs.length).toBe(2)
      inputs.at(0).trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual([['foo']])
    })

    it('null', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: null,
          multiple: true,
        }
      })
      const inputs = wrapper.findAll('input')
      expect(inputs.length).toBe(1)
      inputs.at(0).trigger('input')
      expect(wrapper.emitted('input')[0]).toEqual([[]])
    })

  })

})

describe('autocomplete', () => {

  describe('attribute', () => {

    const subject = (autocomplete) => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: '',
          autocomplete,
        }
      })
      const input = wrapper.find('input')
      return input.attributes().autocomplete
    }

    it('true', () => {
      expect(subject(true)).toEqual('on')
    })

    it('false', () => {
      expect(subject(false)).toEqual('off')
    })

    it('on', () => {
      expect(subject('on')).toEqual('on')
    })

    it('off', () => {
      expect(subject('off')).toEqual('off')
    })

    it('array', () => {
      expect(subject(['foo', 'bar'])).toEqual('off')
    })

    it('function', () => {
      expect(subject(() => ['foo', 'bar'])).toEqual('off')
    })

  })

  describe('dropdown', () => {

    it('array', () => {
      const array = ['foo', 'bar']
      const wrapper = mount(Component, {
        propsData: {
          autocomplete: array,
        }
      })
      const input = wrapper.find('input')
      input.trigger('focus')
      const dropdownListTexts = wrapper.findAll('.dropdown-list-item').wrappers.map(wrapper => wrapper.text())
      expect(dropdownListTexts).toEqual(array)
    })

  })

})
