<template lang='pug'>
number-field(
  v-model='inputValue'
  v-bind='$attrs'
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
  methods: {
    input(value){
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped>
</style>

