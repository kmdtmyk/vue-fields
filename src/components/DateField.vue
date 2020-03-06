<template lang='pug'>
.date-field
  input(
    ref='input'
    type='text'
    autocomplete='off'
    v-model='inputValue'
    v-on='listeners'
    v-bind='$attrs'
    :class='inputClass'
    :style='wrapperStyle'
    @change='onChange'
    @click='onClick'
    @focus='onFocus'
    @blur='onBlur'
    @keydown.esc='onEscKeyDown'
  )
  date-picker.date-picker(
    v-if='open && !readOnly'
    v-model='inputValue'
    @input='select')
  input(v-if='$props.name != null' :name='$props.name' :value='localValue' type='hidden')
</template>

<script>
import dateformat from 'dateformat'
import Midnight from '@kmdtmyk/midnight'
import wrapper from './mixins/wrapper'
import DatePicker from './DatePicker'

export default {
  mixins: [wrapper],
  model: {
    prop: 'value',
  },
  props: {
    name: String,
    value: String,
    inputClass: [String, Array, Object],
  },
  components: {
    DatePicker,
  },
  data(){
    return {
      open: false,
      isMounted: false,
      localValue: null,
      inputValue: this.value,
    }
  },
  mounted(){
    this.isMounted = true
  },
  watch: {
    value: {
      handler(value){
        this.localValue = value
        this.inputValue = value
      },
      immediate: true,
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.onInput,
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
    onInput(e){
      // nothing
    },
    onChange(e){
      const date = Midnight.parse(e.target.value)
      if(date == null){
        this.localValue = null
        this.inputValue = null
        this.$emit('input', null)
      }else{
        const text = dateformat(date, 'yyyy-mm-dd')
        this.localValue = text
        this.inputValue = text
        this.$emit('input', text)
      }
    },
    onClick(e){
      this.open = true
    },
    onFocus(){
      this.open = true
    },
    onBlur(){
      this.open = false
    },
    onEscKeyDown(e){
      this.open = false
    },
    select(value){
      this.localValue = value
      this.$emit('input', value)
      this.open = false
    },
  },
}
</script>

<style lang='scss' scoped>
.date-field{
  display: inline-block;

  .date-picker{
    position: absolute;
    z-index: 9999;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>

