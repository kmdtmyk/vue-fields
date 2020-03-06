<template lang='pug'>
span
  input(
    type='text'
    ref='input'
    v-on='listeners'
    v-bind='$attrs'
    v-model='inputValue'
    :class='inputClass'
    :style='wrapperStyle'
    @focus='focus'
    @blur='blur'
    @drop='drop'
    @keydown.up.prevent='downKeyup'
    @keydown.down.prevent='downKeydown'
  )
  input(v-if='$props.name != null' :name='$props.name' :value='localValue' type='hidden')
</template>

<script>
import wrapper from './mixins/wrapper'
import Parser from '../lib/Parser'
import ElementUtil from '../lib/ElementUtil'
import NumberUtil from '../lib/NumberUtil'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    inputClass: [String, Array, Object],
    name: String,
    delimiter: {
      type: Boolean,
      default: true,
    },
    precision: Number,
    min: Number,
    max: Number,
  },
  data(){
    return {
      localValue: '',
      inputValue: '',
    }
  },
  watch: {
    value: {
      handler(value){
        this.localValue = value
        if(!this.isActive()){
          this.inputValue = this.format(value)
        }
      },
      immediate: true,
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
      const number = NumberUtil.clamp(this.inputValue, this.min, this.max)
      return NumberUtil.round(number, this.precision)
    },
  },
  methods: {
    isActive(){
      return this.$refs.input === document.activeElement
    },
    input(e){
      const value = this.actualValue
      this.localValue = value
      this.$emit('input', value)
    },
    focus(e){
      const {input} = this.$refs
      const select = ElementUtil.selectedAll(input)
      this.$nextTick(() => {
        this.inputValue = this.localValue
        if(select){
          this.$nextTick(() => {
            input.select()
          })
        }else{
          const start = input.selectionStart
          const leftText = input.value.substr(0, start)
          if(!leftText){
            return
          }
          const offset = leftText.length - Parser.parseFloat(leftText).toString().length
          this.$nextTick(() => {
            input.setSelectionRange(start - offset, start - offset)
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
        const start = this.$refs.input.selectionStart
        this.$refs.input.setSelectionRange(start, start + text.length)
      })
    },
    format(value){
      const {precision, delimiter} = this
      return NumberUtil.format(value, {precision, delimiter})
    },
    downKeyup(e){
      const nextValue = this.actualValue + 1
      this.localValue = nextValue
      this.inputValue = nextValue
      this.$emit('input', nextValue)
    },
    downKeydown(e){
      const nextValue = this.actualValue - 1
      this.localValue = nextValue
      this.inputValue = nextValue
      this.$emit('input', nextValue)
    },
  },
}
</script>

<style scoped>
</style>

