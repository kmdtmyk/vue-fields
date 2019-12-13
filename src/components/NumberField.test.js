import {mount} from '@vue/test-utils'
import Component from './NumberField'

describe('name', () => {

  it('has hidden field', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '123456789',
        delimiter: true,
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('123456789')
  })

})

describe('delimiter', () => {

  it('on', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '123456789',
        delimiter: true,
      }
    })
    expect(wrapper.vm.inputValue).toBe('123,456,789')

    wrapper.setProps({value: '987654321'})
    expect(wrapper.vm.inputValue).toBe('987,654,321')
  })

  it('off', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '123456789',
        delimiter: false,
      }
    })
    expect(wrapper.vm.inputValue).toBe('123456789')

    wrapper.setProps({value: '987654321'})
    expect(wrapper.vm.inputValue).toBe('987654321')
  })

})

describe('keydown', () => {

  it('up', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '',
      }
    })

    const input = wrapper.find('input')
    input.trigger('keydown.up')
    expect(wrapper.emitted('input')[0]).toEqual([1])
  })

  it('down', () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '',
      }
    })

    const input = wrapper.find('input')
    input.trigger('keydown.down')
    expect(wrapper.emitted('input')[0]).toEqual([-1])
  })

})
