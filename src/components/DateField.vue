<template lang='pug'>
.date-field
  input(
    type='text'
    ref='input'
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
  date-picker.date-picker(v-if='open && !readOnly' v-model='inputValue' @input='select')
</template>

<script>
import dateformat from 'dateformat'
import wrapper from './mixins/wrapper'
import DatePicker from './DatePicker'

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
    DatePicker,
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
      return this.inputValue
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
      // this.$emit('input', e.target.inputValue)
    },
    select(value){
      this.$emit('input', value)
      this.open = false
    },
    click(e){
      this.open = true
    },
    focus(){
      this.open = true
    },
    blur(){
      this.open = false
      this.inputValue = this.value
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

