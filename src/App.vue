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
          td {{integerFieldValue | json}}
        tr
          td percentage-field
          td
            percentage-field(v-model='percentageFieldValue')
          td {{percentageFieldValue | json}}
        tr
          td date-field
          td
            date-field(v-model='dateFieldValue')
          td {{dateFieldValue | json}}
        tr
          td select-field
          td
            select-field(v-model='selectFieldValue' :records='languages')
          td {{selectFieldValue | json}}
</template>

<script>
import Vue from 'vue'
import Fields from './'
import languages from './sample/languages'

Vue.use(Fields, {
  // defaultClass: 'form-control form-control-sm'
})

export default {
  filters: {
    json(value){
      return JSON.stringify(value)
    }
  },
  data(){
    return {
      dateFieldValue: '',
      percentageFieldValue: '0.05',
      integerFieldValue: 123456789,
      selectFieldValue: '',
      languages,
    }
  },
}
</script>

<style scoped>
</style>
