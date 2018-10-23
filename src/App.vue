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
import DateField from './components/DateField'
import IntegerField from './components/IntegerField'

export default {
  components: {
    DateField,
    IntegerField,
  },
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
