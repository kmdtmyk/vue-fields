<template lang='pug'>
  span.dropdown-input
    input(
      @mousedown='mousedown'
      @focus='focus'
      @blur='blur'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
      @input='input'
      ref='input'
      v-on='listeners'
      v-bind='$attrs'
      v-model='inputValue'
      :style='wrapperStyle'
    )
    .dropdown(
      v-if='dropdownOpen'
      :style='dropdownStyle'
      ref='dropdown'
    )
      slot
</template>

<script>
import wrapper from './mixins/wrapper'
import Elements from './lib/Elements'

export default {
  mixins: [wrapper],
  model: {
    prop: 'value'
  },
  props: [
    'value',
  ],
  data(){
    return {
      dropdownOpen: false,
      dropdownStyle: {},
      inputValue: this.value,
    }
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
  },
  beforeUpdate(){
    this.$nextTick(() => {
      const {dropdown} = this.$refs
      if(dropdown && dropdown.childElementCount == 0){
        this.dropdownOpen = false
      }
    })
  },
  watch: {
    value(){
      this.inputValue = this.value
    },
    dropdownOpen(){
      let elements = Elements.getParents(this.$el)
      if(this.dropdownOpen){
        this.updateDropdownStyle()
        elements.forEach(element => {
          element.addEventListener('scroll', this.onParentScroll)
        })
        addEventListener('resize', this.onWindowResize)
      }else{
        elements.forEach(element => {
          element.removeEventListener('scroll', this.onParentScroll)
        })
        removeEventListener('resize', this.onWindowResize)
      }
    },
  },
  methods: {
    input(e){
      this.$emit('input', e.target.value)
      this.dropdownOpen = true
    },
    mousedown(e){
      this.dropdownOpen = true
    },
    focus(e){
      this.dropdownOpen = true
    },
    blur(e){
      this.dropdownOpen = false
    },
    keydownUp(e){
      this.dropdownOpen = true
    },
    keydownDown(e){
      this.dropdownOpen = true
    },
    keydownEnter(e){
      this.dropdownOpen = false
    },
    keydownEscape(e){
      this.dropdownOpen = false
    },
    onParentScroll(e){
      this.dropdownOpen = false
    },
    onWindowResize(e){
      this.dropdownOpen = false
    },
    updateDropdownStyle(){
      const input = this.$refs.input
      if(!input){
        return
      }
      const {fontSize} = window.getComputedStyle(input)
      const rect = input.getBoundingClientRect()
      const left = `${rect.x}px`
      const top = `${rect.height + rect.y}px`
      const width = `${rect.width}px`
      this.dropdownStyle = {fontSize, width, left, top}
    },
  }
}
</script>

<style lang='scss' scoped>
.dropdown{
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  background-color: white;
  max-height: 15.1em;
  overflow-y: auto;
  position: fixed;
  z-index: 9999;
}
</style>
