<template lang='pug'>
span
  input(
    type='text'
    ref='input'
    v-on='listeners'
    v-bind='$attrs'
    v-model='inputValue'
    :class='defaultClass'
    :style='wrapperStyle'
    @focus='focus'
    @blur='blur'
    @drop='drop'
    @keydown.up.prevent='downKeyup'
    @keydown.down.prevent='downKeydown'
  )
  input(v-if='$props.name' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import wrapper from './mixins/wrapper'
import Parser from './lib/Parser'
import ElementUtil from './lib/ElementUtil'
import NumberUtil from './lib/NumberUtil'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    defaultClass: [String, Array],
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
      inputValue: this.format(this.value)
    }
  },
  watch: {
    value(){
      if(!this.isActive()){
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
      const number = NumberUtil.clamp(this.inputValue, this.min, this.max)
      return NumberUtil.round(number, this.precision)
    },
    $input(){
      return this.$refs.input
    },
  },
  methods: {
    isActive(){
      return this.$input === document.activeElement
    },
    input(e){
      this.$emit('input', this.actualValue)
    },
    focus(e){
      const select = ElementUtil.selectedAll(this.$input)
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
          const offset = leftText.length - Parser.parseFloat(leftText).toString().length
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
      const {precision, delimiter} = this
      return NumberUtil.format(value, {precision, delimiter})
    },
    downKeyup(e){
      const nextValue = this.actualValue + 1
      this.$emit('input', nextValue)
      this.inputValue = nextValue
    },
    downKeydown(e){
      const nextValue = this.actualValue - 1
      this.$emit('input', nextValue)
      this.inputValue = nextValue
    },
  },
}
</script>

<style scoped>
</style>

