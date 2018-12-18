<template lang='pug'>
  component(:is='wrapperTag')
    slot(
      v-for='(record, index) in records'
      v-bind='{[recordName]: record}'
      :index='index'
      :remove='remove(index)'
    )
</template>

<script>
export default {
  props: {
    value: Array,
    recordName: {
      type: String,
      default: 'record',
    },
    wrapperTag: {
      type: String,
      default: 'div',
    },
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
      const records = this.records
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

