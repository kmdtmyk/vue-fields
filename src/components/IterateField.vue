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
          this.$el.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', this.input)
          })
        })
      },
      immediate: true,
    },
  },
  methods: {
    input(e){
      if(this.$props.max && this.$props.max <= this.value.length){
        return
      }
      const {records} = this
      const lastRecord = records[records.length - 1]
      if(0 < Object.keys(lastRecord).length){
        this.$emit('input', records)
      }
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

