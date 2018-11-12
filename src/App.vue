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
          td text-field
          td
            text-field(v-model='textFieldValue')
          td {{textFieldValue | json}}
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
            select-field(v-model='selectFieldValue1' :records='languages')
          td {{selectFieldValue1 | json}}
        tr
          td select-field (function)
          td
            select-field(v-model='selectFieldValue2' :records='recordsFunction1')
          td {{selectFieldValue2 | json}}
        tr
          td select-field (async function)
          td
            select-field(v-model='selectFieldValue3' :records='recordsFunction2')
          td {{selectFieldValue3 | json}}
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
      textFieldValue: '',
      dateFieldValue: '',
      percentageFieldValue: '0.05',
      integerFieldValue: 123456789,
      selectFieldValue1: '',
      selectFieldValue2: '',
      selectFieldValue3: '',
      languages,
    }
  },
  computed: {
    recordsFunction1(){
      return (query) => {
        const records = ['foo', 'bar', 'hoge']
        if(!query){
          return records
        }
        return records.filter(record => record.startsWith(query))
      }
    },
    recordsFunction2(query){
      return async (query) => {
        if(!query){
          return
        }
        const result = await fetch(`https://api.github.com/search/repositories?q=${query}`)
        const text = await result.text()
        const json = JSON.parse(text)
        return json.items.map(item => item.name)
      }
    },
  }
}
</script>

<style scoped>
</style>
