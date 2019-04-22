<template lang='pug'>
.year-field
  integer-field(
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    v-model='inputValue'
    :class='defaultClass'
    :style='wrapperStyle'
    :delimiter='false'
    @click='click'
    @focus='focus'
    @blur='blur'
  )
  year-picker.year-picker(v-if='open' v-model='inputValue' @input='select')
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
    defaultClass: [String, Array],
  },
  components: {
    IntegerField,
    YearPicker,
  },
  data(){
    return {
      open: false,
      inputValue: this.value,
    }
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
  },
}
</script>

<style lang='scss' scoped>
.year-field{
  display: inline-block;
}

.year-picker{
  position: absolute;
  z-index: 1;
}
</style>

