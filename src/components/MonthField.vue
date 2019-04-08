<template lang='pug'>
.month-field
  input(
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    :value='inputValue'
    :class='defaultClass'
    :style='wrapperStyle'
    @input='input'
    @click='click'
    @focus='focus'
    @blur='blur'
  )
  month-picker.month-picker(v-if='open' v-model='inputValue' @input='open = false')
</template>

<script>
import dateformat from 'dateformat'
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
.month-field{
  display: inline-block;
}

.month-picker{
  position: absolute;
  z-index: 1;
}
</style>

