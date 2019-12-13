import {mount} from '@vue/test-utils'
import Component from './RangeField'

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
