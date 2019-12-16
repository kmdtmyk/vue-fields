<template lang='pug'>
.percent-field
  input(
    type='text'
    ref='input'
    v-model='inputValue'
    v-on='listeners'
    v-bind='$attrs'
    :class='inputClass'
    :style='style'
    @input='input'
    @blur='blur'
  )
  .suffix(
    :style='suffixStyle'
  ) {{suffix}}
  input(v-if='$props.name != null' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import Big from 'big.js'
import wrapper from './mixins/wrapper'
import Parser from './lib/Parser'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    inputClass: [String, Array, Object],
    name: String,
    min: [Number, String],
    max: [Number, String],
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
      isMounted: false,
      inputValue: this.toInputValue(this.value),
      suffixStyle: {},
    }
  },
  mounted(){
    this.isMounted = true
    this.$nextTick(() => {
      this.updateSuffixStyle()
    })
  },
  watch: {
    value(){
      if(!this.isActive()){
        this.inputValue = this.toInputValue(this.value)
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
    style(){
      if(!this.isMounted){
        return this.wrapperStyle
      }
      const input = this.$refs.input
      const style = getComputedStyle(input)
      return this.wrapperStyle +
        `marginRight: calc(-1.5em + ${style.paddingRight});` +
        'paddingRight: 1.5em;'
    },
  },
  methods: {
    isActive(){
      return this.$input === document.activeElement
    },
    input(e){
      this.$emit('input', this.toActualValue(e.target.value))
    },
    blur(e){
      this.inputValue = this.toInputValue(this.value)
    },
    toInputValue(value){
      try{
        return new Big(value).div(this.unit).toString()
      }catch(e){
        return null
      }
    },
    toActualValue(value){
      try{
        const floatValue = Parser.parseFloat(value)
        let big = new Big(floatValue).times(this.unit)
        if(this.min != null){
          const min = new Big(this.min)
          if(big.lt(min)){
            big = min
          }
        }
        if(this.max != null){
          const max = new Big(this.max)
          if(big.gt(max)){
            big = max
          }
        }
        return big.toString()
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
    box-sizing: border-box;
    width: 100%;
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
