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
    value: {},
    recordName: {
      default: 'record',
    },
    wrapperTag: {
      default: 'div',
    },
  },
  mounted(){
    this.addInputEvent()
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
        if(this.$el){
          this.addInputEvent()
        }
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
    addInputEvent(){
      this.$el.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', this.input)
      })
    }
  },
}
</script>

<style scoped>
</style>

