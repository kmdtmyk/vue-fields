<template lang='pug'>
  span
    input(
      :class='[defaultClass, classNames]'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      v-for='(inputValue, index) in inputValues'
      :value='inputValue'
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
        if(this.multiple){
          this.inputValues = [...this.value, '']
        }else{
          this.inputValues = [this.value]
        }
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
      return Array.isArray(this.value)
    },
  },
  methods: {
    input(e){
      if(this.multiple){
        const index = this.findIndex(e.target)
        const value = [...this.value]
        value[index] = e.target.value
        this.$emit('input', value)
      }else{
        this.$emit('input', e.target.value)
      }
    },
    change(e){
      if(!this.multiple || e.target.value){
        return
      }
      const index = this.findIndex(e.target)
      this.value.splice(index, 1)
    },
    findIndex(node){
      return [...this.$el.childNodes].findIndex(it => it === node)
    },
  },
}
</script>

<style scoped>
</style>

