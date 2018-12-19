<template lang='pug'>
.dropdown-input
  input(
    :class='defaultClass'
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
  .spinner(v-if='loading')
    loading-spinner
  .clear(v-else-if='clearable' @click='clickClear')
  .dropdown(
    v-if='editable && dropdownOpen'
    :style='dropdownStyle'
    ref='dropdown'
  )
    slot
</template>

<script>
import wrapper from './mixins/wrapper'
import Elements from './lib/Elements'
import LoadingSpinner from './LoadingSpinner'

export default {
  mixins: [wrapper],
  components: {
    LoadingSpinner,
  },
  model: {
    prop: 'value'
  },
  props: {
    value: [String],
    clear: Boolean,
    loading: Boolean,
    defaultClass: [String, Array],
  },
  data(){
    return {
      isMounted: false,
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
    editable(){
      if(!this.isMounted){
        return false
      }
      const {input} = this.$refs
      if(input.readOnly || input.disabled){
        return false
      }
      return true
    },
    clearable(){
      if(!this.editable){
        return false
      }
      return this.$props.clear || !!this.value
    },
  },
  mounted(){
    this.isMounted = true
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
    clickClear(){
      this.$emit('clear', null)
    },
  }
}
</script>

<style lang='scss' scoped>
.dropdown-input{
  display: inline-block;
  position: relative;
}

input{
  padding-right: 2em;
}

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

.spinner, .clear{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner{
  width: 1.5em;
}

.clear{
  width: 1.8em;
  text-align: center;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
}

.clear::after{
  content: '×';
  font-size: 1.2em;
}
</style>
