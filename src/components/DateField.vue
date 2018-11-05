<template lang='pug'>
  span
    input(
      :class='defaultClass'
      type='text'
      v-on='listeners'
      :value='_value'
      @input='input'
      @click='click'
      @focus='focus'
      @blur='blur'
    )
    date-picker.picker(v-if='open' v-model='value')
</template>

<script>
import dateformat from 'dateformat'
import DatePicker from './DatePicker'

export default {
  model: {
    prop: '_value',
  },
  props: [
    '_value',
    'defaultClass',
  ],
  components: {
    DatePicker,
  },
  data(){
    return {
      open: false,
      value: this._value,
    }
  },
  watch: {
    _value(){
      return this.value
    },
    value(){
      this.$emit('input', this.value)
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
      // this.$emit('input', e.target.value)
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
    select(date){
      if(!date){
        this.$emit('input', date)
      }else{
        this.$emit('input', dateformat(date, 'yyyy-mm-dd'))
      }
      this.open = false
    },
  },
}
</script>

<style lang='scss' scoped>
.picker{
  position: absolute;
}
</style>

