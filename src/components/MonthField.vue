<template lang='pug'>
.month-field
  input(
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    :value='inputValue'
    :class='defaultClass'
    :style='wrapperStyle'
    @change='change'
    @click='click'
    @focus='focus'
    @blur='blur'
  )
  month-picker.month-picker(v-if='open' v-model='inputValue' @input='select')
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
      inputValue: this.value,
    }
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
  },
}
</script>

<style lang='scss' scoped>
.month-field{
  display: inline-block;
}

.month-picker{
  position: absolute;
  z-index: 1;
}
</style>

