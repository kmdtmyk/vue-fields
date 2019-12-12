import {mount} from '@vue/test-utils'
import Component from './DateField'

describe('name', () => {

  it('has hidden field', () => {
    const wrapper = mount(Component, {
      propsData: {
        name: 'foo',
        value: '2019-05-25',
      }
    })
    const hidden = wrapper.find('input[type=hidden]')
    expect(wrapper.attributes().name).toBeUndefined()
    expect(hidden.attributes().name).toBe('foo')
    expect(hidden.attributes().value).toBe('2019-05-25')
  })

})
