<template lang='pug'>
  input(
    :class='defaultClass'
    type='text'
    v-on='listeners'
    :value='value'
    @input='input'
    @focus='focus'
    @blur='blur'
  )
</template>

<script>
import DatePicker from './DatePicker'
import Vue from 'vue'

// static
const ComponentClass  = Vue.extend(DatePicker)
const instance = new ComponentClass()
const datePicker = instance.$mount().$el

export default {
  props: [
    'value',
    'defaultClass',
  ],
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    parent(){
      return this.$el.parentElement
    },
  },
  methods: {
    input(e){
      this.$emit('input', e.target.value)
    },
    focus(){
      this.parent.appendChild(datePicker)
    },
    blur(){
      this.parent.removeChild(datePicker)
    },
  },
}
</script>

<style scoped>
</style>

