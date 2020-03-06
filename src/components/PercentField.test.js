import {mount} from '@vue/test-utils'
import Component from './PercentField'

describe('name', () => {

  it('with props value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '0.5',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('0.5')
    input.setValue('15')
    await wrapper.vm.$nextTick()
    expect(hidden.attributes().value).toBe('0.15')
    wrapper.setProps({value: '0.3'})
    expect(hidden.attributes().value).toBe('0.3')
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
    input.setValue('11')
    expect(hidden.attributes().value).toBe('0.11')
    wrapper.setProps({value: '0.3'})
    expect(hidden.attributes().value).toBe('0.3')
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
