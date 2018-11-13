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
      if(!this.multiple){
        this.$emit('input', e.target.value)
        return
      }
      const {inputValues} = this
      if(!inputValues[inputValues.length - 1]){
        inputValues.splice(inputValues.length - 1, 1)
      }
      this.$emit('input', inputValues)
    },
    change(e){
      if(!this.multiple || e.target.value){
        return
      }
      const index = this.findIndex(e.target)
      this.remove(index)
    },
    findIndex(node){
      return [...this.$el.childNodes].findIndex(it => it === node)
    },
    remove(index){
      if(!this.multiple){
        return
      }
      const {inputValues} = this
      inputValues.splice(index, 1)
      inputValues.splice(inputValues.length - 1, 1)
      this.$emit('input', inputValues)
    }
  },
}
</script>

<style scoped>
</style>

