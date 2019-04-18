import {mount} from '@vue/test-utils'
import Component from './NumberField'


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