import {shallowMount} from '@vue/test-utils'
import Component from './IntegerField'

it('test', () => {
  const wrapper = shallowMount(Component, {
    propsData: {
      value: '123456789',
    }
  })
  expect(wrapper.vm.inputValue).toBe('123,456,789')

  wrapper.setProps({value: '987654321'})
  expect(wrapper.vm.inputValue).toBe('987,654,321')

})
