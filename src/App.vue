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
          td date-field
          td
            date-field(v-model='dateFieldValue')
            |{{dateFieldValue}}
</template>

<script>
import DateField from './components/DateField'

export default {
  components: {
    DateField
  },
  data(){
    return {
      dateFieldValue: '',
    }
  },
}
</script>

<style>
</style>
