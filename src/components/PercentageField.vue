<template lang='pug'>
  .percentage-field
    input(
      ref='input'
      :class='defaultClass'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      @input='input'
      v-model.number='text'
      :style='wrapperStyle'
    )
    .suffix(
      :style='suffixStyle'
    ) {{suffix}}
    input(v-if='$props.name' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import Decimal from 'decimal.js'
import wrapper from './mixins/wrapper'

export default {
  mixins: [wrapper],
  props: {
    value: [Number, String],
    defaultClass: [String, Array],
    name: String,
  },
  data(){
    const text = this.encode()
    return {
      text,
      suffixStyle: {},
      suffix: '%',
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.updateSuffixStyle()
    })
  },
  watch: {
    value(){
      this.text = this.encode()
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
  },
  methods: {
    input(e){
      this.$emit('input', this.decode())
    },
    encode(){
      try{
        return Decimal.mul(this.value, 100)
      }catch(e){
        return null
      }
    },
    decode(){
      try{
        return Decimal.div(this.text, 100).toString()
      }catch(e){
        return null
      }
    },
    updateSuffixStyle(){
      const input = this.$refs.input
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
.percentage-field{
  position: relative;
  display: inline-block;
}

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
</style>
