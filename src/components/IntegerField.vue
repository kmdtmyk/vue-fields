<template lang='pug'>
number-field(
  v-model='inputValue'
  v-bind='$attrs'
  v-on='listeners'
  :delimiter='delimiter'
  :precision='0'
  @input='input'
  )
</template>

<script>
import NumberField from './NumberField'

export default {
  props: {
    value: [Number, String],
    delimiter: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    NumberField,
  },
  inheritAttrs: false,
  data(){
    return {
      inputValue: this.value
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
    input(value){
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped>
</style>

