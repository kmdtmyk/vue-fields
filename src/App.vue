<template lang='pug'>
  div
    table
      thead
        tr
          th name
          th component
          th value
      tbody
        tr
          td integer-field
          td
            integer-field(v-model='integerFieldValue')
          td {{integerFieldValue}}
        tr
          td date-field
          td
            date-field(v-model='dateFieldValue')
          td {{dateFieldValue}}
</template>

<script>
import Vue from 'vue'
import Fields from './components'

Vue.use(Fields, {
  // defaultClass: 'form-control form-control-sm'
})

export default {
  data(){
    return {
      dateFieldValue: '',
      integerFieldValue: 123456789,
    }
  },
}
</script>

<style scoped>
</style>
