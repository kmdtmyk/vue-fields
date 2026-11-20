import {mount} from '@vue/test-utils'
import Component from './PercentField.vue'

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
    await input.setValue('15')
    expect(hidden.attributes().value).toBe('0.15')
    await wrapper.setProps({value: '0.3'})
    expect(hidden.attributes().value).toBe('0.3')
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
    await input.setValue('11')
    expect(hidden.attributes().value).toBe('0.11')
    await wrapper.setProps({value: '0.3'})
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

describe('conversion', () => {

  it('converts the displayed percentage to the actual value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')

    await input.setValue('12.34')

    expect(wrapper.emitted('input')[0]).toEqual(['0.1234'])
    expect(hidden.attributes().value).toBe('0.1234')
  })

  it('converts the actual value to the displayed percentage', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: '0.1234',
      }
    })

    expect(wrapper.find('input[type=text]').element.value).toBe('12.34')
  })

  it('preserves decimal precision during conversion', async () => {
    const wrapper = mount(Component)
    const input = wrapper.find('input[type=text]')

    await input.setValue('33.33')

    expect(wrapper.emitted('input')[0]).toEqual(['0.3333'])
  })

})

describe('unit', () => {

  it('uses a custom unit for conversion', async () => {
    const wrapper = mount(Component, {
      propsData: {
        unit: 1,
      }
    })
    const input = wrapper.find('input[type=text]')

    expect(input.element.value).toBe('')
    await input.setValue('12.34')

    expect(wrapper.emitted('input')[0]).toEqual(['12.34'])
  })

})

describe('min and max', () => {

  it('clamps the actual value to min and max', async () => {
    const wrapper = mount(Component, {
      propsData: {
        min: '0.2',
        max: '0.8',
      }
    })
    const input = wrapper.find('input[type=text]')

    await input.setValue('10')
    await input.setValue('90')

    expect(wrapper.emitted('input')[0]).toEqual(['0.2'])
    expect(wrapper.emitted('input')[1]).toEqual(['0.8'])
  })

})
