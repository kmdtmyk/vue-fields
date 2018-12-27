<template lang='pug'>
component(:is='wrapperTag')
  slot(
    v-for='(record, index) in records'
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
  watch: {
    value: {
      handler(value){
        const records = []
        if(Array.isArray(value)){
          records.push(...value)
        }
        if(!this.$props.max || records.length < this.$props.max){
          records.push({})
        }
        this.records = records

        this.$nextTick(() => {
          Elements.getInputChildren(this.$el).forEach(input => {
            input.removeEventListener('input', this.inputLast)
          })
          const children = this.$el.children
          const lastChild = children[children.length - 1]
          Elements.getInputChildren(lastChild).forEach(input => {
            input.addEventListener('input', this.inputLast)
          })
        })
      },
      immediate: true,
    },
  },
  methods: {
    inputLast(e){
      if(this.$props.max && this.$props.max <= this.value.length){
        return
      }
      const {records} = this
      this.$nextTick(() => {
        if(records.length < this.records.length){
          return
        }
        this.$emit('input', records)
      })
    },
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

