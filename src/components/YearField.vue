<template lang='pug'>
.year-field
  integer-field(
    ref='input'
    type='text'
    autocomplete='off'
    v-on='listeners'
    v-bind='$attrs'
    v-model='inputValue'
    :style='wrapperStyle'
    :delimiter='false'
    @click='click'
    @focus='focus'
    @blur='blur'
    @keydown.esc='keydownEsc'
  )
  year-picker.year-picker(
    v-if='open && !readOnly'
    v-model='inputValue'
    @input='select')
</template>

<script>
import wrapper from './mixins/wrapper'
import IntegerField from './IntegerField'
import YearPicker from './YearPicker'

export default {
  mixins: [wrapper],
  model: {
    prop: 'value',
  },
  props: {
    value: [Number, String],
  },
  components: {
    IntegerField,
    YearPicker,
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
      // this.inputValue = this.value
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    $input(){
      return this.$refs.input.$input
    },
    readOnly(){
      if(!this.isMounted){
        return false
      }
      return this.$input.readOnly
    },
  },
  methods: {
    input(e){
      this.$emit('input', e)
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
      document.activeElement.blur()
      this.$emit('input', value)
      this.$nextTick(() => {
        this.inputValue = value
      })
    },
    keydownEsc(e){
      this.open = false
    },
  },
}
</script>

<style lang='scss' scoped>
.year-field{
  display: inline-block;

  .year-picker{
    position: absolute;
    z-index: 9999;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>

