import {mount} from '@vue/test-utils'
import Component from './YearField'

describe('name', () => {

  it('has hidden field', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '2019',
      }
    })
    const input = wrapper.find('input[type=text]')
    const hidden = wrapper.find('input[type=hidden]')
    expect(input.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('2019')
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
