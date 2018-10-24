import {shallowMount} from '@vue/test-utils'
import Component from './IntegerField'

it('test', () => {
  const wrapper = shallowMount(Component, {
    propsData: {
      value: '123',
    }
  })
  expect(wrapper.vm.actualValue).toBe(123)
})
