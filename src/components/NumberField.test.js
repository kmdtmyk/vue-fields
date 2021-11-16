import {mount} from '@vue/test-utils'
import Component from './NumberField'

describe('name', () => {

  it('with props value', async () => {
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
    await input.setValue('456')
    expect(hidden.attributes().value).toBe('456')
    await wrapper.setProps({value: '789'})
    expect(hidden.attributes().value).toBe('789')
  })

  it('without props value', async () => {
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
    await input.setValue('123')
    expect(hidden.attributes().value).toBe('123')
    await wrapper.setProps({value: '789'})
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

describe('delimiter', () => {

  it('on', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '123456789',
        delimiter: true,
      }
    })
    expect(wrapper.vm.inputValue).toBe('123,456,789')
    await wrapper.setProps({value: '987654321'})
    expect(wrapper.vm.inputValue).toBe('987,654,321')
  })

  it('off', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '123456789',
        delimiter: false,
      }
    })
    expect(wrapper.vm.inputValue).toBe('123456789')
    await wrapper.setProps({value: '987654321'})
    expect(wrapper.vm.inputValue).toBe('987654321')
  })

})

describe('keydown', () => {

  it('up', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo'
      }
    })

    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    await input.trigger('keydown.up')
    expect(wrapper.emitted('input')[0]).toEqual([1])
    expect(hidden.attributes().value).toEqual('1')
  })

  it('down', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo'
      }
    })

    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    await input.trigger('keydown.down')
    expect(wrapper.emitted('input')[0]).toEqual([-1])
    expect(hidden.attributes().value).toEqual('-1')
  })

})
