import {mount} from '@vue/test-utils'
import Component from './RangeField.vue'

describe('name', () => {

  it('has name attribute', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: 10,
      }
    })
    const input = wrapper.find('input[type=range]')
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
      const input = wrapper.find('input[type=range]')
      return input.attributes().class
    }

    expect(subject('foo bar')).toEqual('foo bar')
    expect(subject(['foo', 'baz'])).toEqual('foo baz')
    expect(subject({foo: true, bar: false, hoge: true})).toEqual('foo hoge')
  })

})

describe('tooltip', () => {

  it('shows while dragging', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 50,
        tooltip: true,
      },
    })
    const input = wrapper.find('input[type=range]')

    expect(wrapper.find('.tooltip').exists()).toBe(false)
    await input.trigger('mousedown')
    expect(wrapper.find('.tooltip').exists()).toBe(true)
    await input.trigger('mouseup')
    expect(wrapper.find('.tooltip').exists()).toBe(false)
  })

})
