<template lang='pug'>
  .date-field
    input(
      :class='defaultClass'
      ref='input'
      type='text'
      v-on='listeners'
      :value='inputValue'
      @input='input'
      @click='click'
      @focus='focus'
      @blur='blur'
    )
    date-picker.date-picker(v-if='open' v-model='inputValue' @input='open = false')
</template>

<script>
import dateformat from 'dateformat'
import DatePicker from './DatePicker'
import ElementUtil from '../lib/ElementUtil'

export default {
  model: {
    prop: 'value',
  },
  props: {
    value: String,
    defaultClass: [String, Array],
  },
  components: {
    DatePicker,
  },
  data(){
    return {
      open: false,
      inputValue: this.value,
    }
  },
  mounted(){
    ElementUtil.delegateAttribute(this.$el, this.$refs.input, 'style')
  },
  watch: {
    value(){
      return this.inputValue
    },
    inputValue(){
      this.$emit('input', this.inputValue)
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
      // this.$emit('input', e.target.inputValue)
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
  },
}
</script>

<style lang='scss' scoped>
.date-field{
  display: inline-block;
}

.date-picker{
  position: absolute;
  z-index: 1;
}
</style>

