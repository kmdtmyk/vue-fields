<template lang='pug'>
.month-field
  input(
    type='text'
    ref='input'
    v-on='listeners'
    v-bind='$attrs'
    :value='inputValue'
    :class='defaultClass'
    :style='wrapperStyle'
    @change='change'
    @click='click'
    @focus='focus'
    @blur='blur'
    @keydown.esc='keydownEsc'
  )
  month-picker.month-picker(
    v-if='open && !readOnly'
    v-model='inputValue'
    @input='select')
</template>

<script>
import dateformat from 'dateformat'
import Midnight from '@kmdtmyk/midnight'
import wrapper from './mixins/wrapper'
import MonthPicker from './MonthPicker'

export default {
  mixins: [wrapper],
  model: {
    prop: 'value',
  },
  props: {
    value: String,
    defaultClass: [String, Array],
  },
  components: {
    MonthPicker,
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
      const date = Midnight.parse(e.target.value)
      if(date == null){
        this.$emit('input', null)
      }else{
        this.$emit('input', dateformat(date, 'yyyy-mm'))
      }
    },
    click(e){
      this.open = true
    },
    focus(){
      this.open = true
    },
    blur(){
      this.open = false
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
.month-field{
  display: inline-block;

  .month-picker{
    position: absolute;
    z-index: 1;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>
