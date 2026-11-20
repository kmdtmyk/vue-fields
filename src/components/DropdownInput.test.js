import {mount} from '@vue/test-utils'
import Component from './DropdownInput.vue'

const mountOpenDropdown = async () => {
  const wrapper = mount(Component, {
    propsData: {
      readonly: false,
      disabled: false,
    },
  })
  wrapper.vm._onFocus()
  await wrapper.vm.$nextTick()
  return wrapper
}

describe('anchor positioning', () => {

  it('uses a unique anchor name per component', () => {
    const first = mount(Component)
    const second = mount(Component)

    expect(first.vm.anchorName).not.toBe(second.vm.anchorName)
  })

  it('connects the dropdown to the input anchor', async () => {
    const wrapper = await mountOpenDropdown()
    const anchorName = wrapper.vm.anchorName
    const input = wrapper.find('input').element
    const dropdown = wrapper.find('.dropdown').element

    expect(input.style.getPropertyValue('anchor-name')).toBe(anchorName)
    expect(dropdown.style.getPropertyValue('position-anchor')).toBe(anchorName)
  })

  it('closes on scroll', async () => {
    const wrapper = await mountOpenDropdown()

    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.dropdown').exists()).toBe(false)
  })

  it('closes on resize', async () => {
    const wrapper = await mountOpenDropdown()

    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.dropdown').exists()).toBe(false)
  })

})
