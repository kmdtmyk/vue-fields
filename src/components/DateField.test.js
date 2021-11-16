import {mount} from '@vue/test-utils'
import Component from './DateField'

describe('name', () => {

  it('with props value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '2019-05-01',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('2019-05-01')
    input.setValue('2019-05-02')
    input.trigger('change')
    await wrapper.vm.$nextTick()
    expect(hidden.attributes().value).toBe('2019-05-02')
    wrapper.setProps({value: '2019-05-03'})
    await wrapper.vm.$nextTick()
    expect(hidden.attributes().value).toBe('2019-05-03')
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
    input.setValue('2019-05-02')
    input.trigger('change')
    await wrapper.vm.$nextTick()
    expect(hidden.attributes().value).toBe('2019-05-02')
    wrapper.setProps({value: '2019-05-03'})
    await wrapper.vm.$nextTick()
    expect(hidden.attributes().value).toBe('2019-05-03')
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
