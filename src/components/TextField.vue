<template lang='pug'>
  span
    input(
      :class='[defaultClass, classNames]'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      v-for='(inputValue, index) in inputValues'
      v-model='inputValues[index]'
      :key='index'
    )
</template>

<script>
export default {
  props: [
    'value',
    'defaultClass',
  ],
  inheritAttrs: false,
  mounted(){
    const {classList} = this.$el
    const classNames = [...classList.values()]
    if(0 < classNames.length){
      classList.remove(classNames)
    }
    this.classNames = classNames
  },
  data(){
    return {
      classNames: []
    }
  },
  watch: {
    value: {
      handler(value){
        const values = []
        if(this.multiple){
          if(Array.isArray(this.value)){
            values.push(...this.value)
          }else if(this.value){
            values.push(this.value)
          }
          values.push('')
        }else{
          values.push(this.value)
        }
        this.inputValues = values
      },
      immediate: true,
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
        change: this.change,
      }
    },
    multiple(){
      return this.$attrs.multiple === '' || !!this.$attrs.multiple
    },
  },
  methods: {
    input(e){
      if(this.multiple){
        const {inputValues} = this
        if(!inputValues[inputValues.length - 1]){
          inputValues.splice(inputValues.length - 1, 1)
        }
        this.$emit('input', inputValues)
      }else{
        this.$emit('input', e.target.value)
      }
    },
    change(e){
      if(!this.multiple || e.target.value){
        return
      }
      const {inputValues} = this
      const index = this.findIndex(e.target)
      inputValues.splice(index, 1)
      inputValues.splice(inputValues.length - 1, 1)
      this.$emit('input', inputValues)
    },
    findIndex(node){
      return [...this.$el.childNodes].findIndex(it => it === node)
    },
  },
}
</script>

<style scoped>
</style>

