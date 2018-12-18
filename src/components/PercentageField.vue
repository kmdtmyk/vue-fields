<template lang='pug'>
  span
    input(
      :class='defaultClass'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      @input='input'
      v-model.number='text'
    )
    //- input(
      type='hidden'
      :name='name'
      :value='value'
      )
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
    }
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
$unit-width: 1.2em;

span{
  position: relative;
  display: inline-block;
  margin-right: -$unit-width;
}

span::after{
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: $unit-width;
  align-items: center;
  width: 1.2em;
  content: '%'
}

input{
  padding-right: $unit-width;
  width: calc(100% - #{$unit-width});
  box-sizing: border-box;
}
</style>
