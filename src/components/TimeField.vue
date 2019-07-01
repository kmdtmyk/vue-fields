<template lang='pug'>
.time-field
  input(
    type='text'
    ref='input'
    v-on='listeners'
    v-bind='$attrs'
    :value='inputValue'
    :class='inputClass'
    :style='wrapperStyle'
    @change='change'
    @click='click'
    @focus='focus'
    @blur='blur'
    @keydown.esc='keydownEsc'
  )
  time-picker.time-picker(
    v-if='open && !readOnly'
    v-model='inputValue'
    @input='select')
</template>

<script>
import dateformat from 'dateformat'
import Midnight from '@kmdtmyk/midnight'
import wrapper from './mixins/wrapper'
import TimePicker from './TimePicker'

export default {
  mixins: [wrapper],
  model: {
    prop: 'value',
  },
  props: {
    value: String,
    inputClass: [String, Array],
  },
  components: {
    TimePicker,
  },
  data(){
    return {
      open: false,
      isMounted: false,
      inputValue: this.value,
    }
  },
  mounted(){
    this.isMounted = true
  },
  watch: {
    value(){
      this.inputValue = this.value
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    readOnly(){
      if(!this.isMounted){
        return false
      }
      const {input} = this.$refs
      return input.readOnly
    },
  },
  methods: {
    input(e){
      // nothing
    },
    change(e){
      this.$emit('input', e.target.value)
    },
    click(e){
      this.open = true
    },
    focus(){
      this.open = true
    },
    blur(){
      // this.open = false
    },
    select(value){
      this.$emit('input', value)
      this.open = false
    },
    keydownEsc(e){
      this.open = false
    },
  },
}
</script>

<style lang='scss' scoped>
.time-field{
  display: inline-block;

  .time-picker{
    position: absolute;
    z-index: 1;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>
