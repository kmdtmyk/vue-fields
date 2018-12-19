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
            select-field(v-model='selectFieldValue' :records='languages' placeholder='select...')
          td {{selectFieldValue | json}}
    hr
    table
      thead
        tr
          th name
          th price
          th release date
          th
            button(type='button' @click='books.push({})') add
          th
      iterate-field(v-model='books' wrapper-tag='tbody' record-name='book')
        tr(slot-scope='{book, remove}')
          td
            text-field(v-model='book.name')
          td
            integer-field(v-model='book.price')
          td
            date-field(v-model='book.releaseDate')
          td
            button(type='button' @click='remove') remove
          td {{book}}
    pre {{books}}
</template>

<script>
import Vue from 'vue'
import Fields from './'
import languages from './sample/languages'

Vue.use(Fields, {
  defaultClass: 'form-control form-control-sm'
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
      selectFieldValue: '',
      languages,
      books: [{name:'book1', price:500}],
    }
  },
}
</script>

<style scoped>
</style>
