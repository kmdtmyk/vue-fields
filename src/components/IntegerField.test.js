import {mount} from '@vue/test-utils'
import Component from './IntegerField'

describe('name', () => {

  it('has hidden field', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '123456789',
        delimiter: true,
      }
    })
    const hidden = wrapper.find('input[type=hidden]')
    expect(wrapper.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('123456789')
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
