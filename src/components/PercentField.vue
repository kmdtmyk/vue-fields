<template lang='pug'>
.percent-field
  input(
    ref='input'
    :class='defaultClass'
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    @input='input'
    @blur='blur'
    v-model='inputValue'
    :style='wrapperStyle'
  )
  .suffix(
    :style='suffixStyle'
  ) {{suffix}}
  input(v-if='$props.name' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import Big from 'big.js'
import wrapper from './mixins/wrapper'
import Parser from './lib/Parser'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    defaultClass: [String, Array],
    name: String,
    unit: {
      type: Number,
      default: 1/100,
    },
    suffix: {
      type: String,
      default: '%'
    }
  },
  data(){
    return {
      inputValue: this.encode(this.value),
      suffixStyle: {},
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.updateSuffixStyle()
    })
  },
  watch: {
    value(){
      if(!this.active){
        this.inputValue = this.encode(this.value)
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
    $input(){
      return this.$refs.input
    },
    active(){
      return this.$input === document.activeElement
    },
  },
  methods: {
    input(e){
      this.$emit('input', this.decode(e.target.value))
    },
    blur(e){
      this.inputValue = this.encode(this.value)
    },
    encode(value){
      try{
        return new Big(value).div(this.unit).toString()
      }catch(e){
        return null
      }
    },
    decode(value){
      try{
        const floatValue = Parser.parseFloat(value)
        return new Big(floatValue).times(this.unit).toString()
      }catch(e){
        return null
      }
    },
    updateSuffixStyle(){
      const input = this.$input
      if(!input){
        return
      }
      const style = getComputedStyle(input)
      const inputRect = input.getBoundingClientRect()
      const elRect = this.$el.getBoundingClientRect()
      this.suffixStyle.fontSize = style.fontSize
      this.suffixStyle.top = `${inputRect.top - elRect.top}px`
      this.suffixStyle.bottom = `${elRect.bottom - inputRect.bottom}px`
      this.$forceUpdate()
    },
  },
}
</script>

<style lang='scss' scoped>
.percent-field{
  position: relative;
  display: inline-block;

  input{
    padding-right: 1.5em;
    box-sizing: border-box;
  }

  .suffix{
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    right: 0;
    align-items: center;
    width: 1.2em;
  }

}
</style>
