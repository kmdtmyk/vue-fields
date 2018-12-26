<template lang='pug'>
span
  input(
    :class='defaultClass'
    ref='input'
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    v-model='inputValue'
    @input='input'
    @focus='focus'
    @blur='blur'
    @drop='drop'
    @keydown.up='downKeyup'
    @keydown.down='downKeydown'
    :style='wrapperStyle'
  )
</template>

<script>
import wrapper from './mixins/wrapper'
import Parser from './lib/Parser'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    defaultClass: [String, Array],
  },
  data(){
    return {
      inputValue: this.format(this.value)
    }
  },
  watch: {
    value(){
      if(this.active){
        this.inputValue = this.value
      }else{
        this.inputValue = this.format(this.value)
      }
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    actualValue(){
      let {inputValue} = this
      if(typeof inputValue === 'number'){
        return inputValue
      }else if(typeof inputValue === 'string'){
        return Parser.parseInt(inputValue)
      }else{
        return null
      }
    },
    $input(){
      return this.$refs.input
    },
    active(){
      return this.$input === document.activeElement
    },
  },
  methods: {
    selectedAll(){
      const input = this.$input
      const start = input.selectionStart
      const end = input.selectionEnd
      const value = input.value
      return start === 0 && end === value.length
    },
    input(e){
      this.$emit('input', this.actualValue)
    },
    focus(e){
      const select = this.selectedAll()
      this.$nextTick(() => {
        this.inputValue = this.value
        if(select){
          this.$nextTick(() => {
            this.$input.select()
          })
        }else{
          const start = this.$input.selectionStart
          const leftText = this.$input.value.substr(0, start)
          if(!leftText){
            return
          }
          const offset = leftText.length - Parser.parseInt(leftText).toString().length
          this.$nextTick(() => {
            this.$input.setSelectionRange(start - offset, start - offset)
          })
        }
      })
    },
    blur(e){
      this.inputValue = this.format(this.actualValue)
    },
    drop(e){
      const text = e.dataTransfer.getData('text')
      this.inputValue = this.value
      setTimeout(() => {
        const start = this.$input.selectionStart
        this.$input.setSelectionRange(start, start + text.length)
      })
    },
    format(value){
      if(typeof value !== 'number'){
        value = Parser.parseInt(value)
      }
      if(!value){
        return null
      }
      return value.toLocaleString()
    },
    downKeyup(e){
      this.$emit('input', this.actualValue + 1)
    },
    downKeydown(e){
      this.$emit('input', this.actualValue - 1)
    },
  },
}
</script>

<style scoped>
</style>

