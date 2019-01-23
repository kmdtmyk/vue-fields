<template lang='pug'>
component(:is='wrapperTag')
  template(v-for='(record, index) in records')
    slot(
      v-if='max == null || index < max'
      v-bind='{[recordName]: record}'
      :index='index'
      :remove='remove(index)'
      :present='!!value[index]'
    )
</template>

<script>
import Elements from './lib/Elements'

export default {
  props: {
    value: {
      type: Array,
      default(){
        return []
      },
    },
    recordName: {
      type: String,
      default: 'record',
    },
    wrapperTag: {
      type: String,
      default: 'div',
    },
    max: {
      type: Number,
    },
  },
  data(){
    return {
      records: []
    }
  },
  beforeUpdate(){
    const last = this.records[this.records.length - 1]
    if(0 < Object.keys(last).length){
      this.$emit('input', this.records)
    }
  },
  watch: {
    value: {
      handler(value){
        const records = []
        if(Array.isArray(value)){
          records.push(...value)
        }
        records.push({})
        this.records = records
      },
      immediate: true,
    },
  },
  methods: {
    remove(index){
      return e => {
        this.value.splice(index, 1)
      }
    },
  },
}
</script>

<style scoped>
</style>

