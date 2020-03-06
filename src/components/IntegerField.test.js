import {mount} from '@vue/test-utils'
import Component from './IntegerField'

describe('name', () => {

  it('with props value', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '123',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('123')
    input.setValue('456')
    expect(hidden.attributes().value).toBe('456')
    wrapper.setProps({value: '789'})
    expect(hidden.attributes().value).toBe('789')
  })

  it('without props value', () => {
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
    input.setValue('123')
    expect(hidden.attributes().value).toBe('123')
    wrapper.setProps({value: '789'})
    expect(hidden.attributes().value).toBe('789')
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

describe('input', () => {

  it('set value', () => {
    const wrapper = mount(Component, {
      propsData: {
        delimiter: true,
      }
    })
    const input = wrapper.find('input[type=text]')
    input.setValue('123.45')
    expect(wrapper.emitted('input')[0]).toEqual([123])
    input.setValue('123abc456')
    expect(wrapper.emitted('input')[1]).toEqual([123456])
    input.setValue('123,456,789')
    expect(wrapper.emitted('input')[2]).toEqual([123456789])
    input.setValue('invalid')
    expect(wrapper.emitted('input')[3]).toEqual([null])
  })

})

describe('keydown', () => {

  it('up', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '',
      }
    })

    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    input.trigger('keydown.up')
    expect(wrapper.emitted('input')[0]).toEqual([1])
    expect(hidden.attributes().value).toEqual('1')
  })

  it('down', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '',
      }
    })

    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    input.trigger('keydown.down')
    expect(wrapper.emitted('input')[0]).toEqual([-1])
    expect(hidden.attributes().value).toEqual('-1')
  })

})
