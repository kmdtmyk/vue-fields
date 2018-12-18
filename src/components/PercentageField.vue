<template lang='pug'>
  .percentage-field
    input(
      :class='defaultClass'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      @input='input'
      v-model.number='text'
      ref='input'
    )
    .suffix(
      :style='suffixStyle'
    ) {{suffix}}
    input(v-if='$props.name' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import Decimal from 'decimal.js'

export default {
  props: {
    value: [Number, String],
    defaultClass: [String, Array],
    name: String,
  },
  inheritAttrs: false,
  data(){
    const text = this.encode()
    return {
      text,
      suffixStyle: {},
      suffix: '%',
    }
  },
  mounted(){
    const input = this.$refs.input
    console.log(input)
    const style = getComputedStyle(input)
    this.suffixStyle.fontSize = style.fontSize
    this.$forceUpdate()
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
        return Decimal.div(this.text, 100)
      }catch(e){
        return null
      }
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
