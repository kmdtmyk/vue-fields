<template lang='pug'>
  input(
    type='text'
    v-on='listeners'
    v-model='inputValue'
    @input='input'
    @focus='focus'
    @blur='blur'
  )
</template>

<script>
export default {
  props: [
    'value',
  ],
  data(){
    return {
      inputValue: this.format(this.value)
    }
  },
  watch: {
    value(){
      if(this.$el !== document.activeElement){
        this.inputValue = this.format(this.value)
      }
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    actualValue(){
      let {inputValue} = this
      if(typeof inputValue === 'number'){
        return inputValue
      }else if(typeof inputValue === 'string'){
        return this.parseString(inputValue)
      }else{
        return null
      }
    },
  },
  methods: {
    input(e){
      this.$emit('input', this.actualValue)
    },
    focus(e){
      this.inputValue = this.value
    },
    blur(e){
      this.inputValue = this.format(this.actualValue)
    },
    parseString(string){
      if(!string){
        return null
      }
      string = string.normalize('NFKC')
      string = string.replace(/[^-\d\.]/g, '')
      const value = parseInt(string)
      if(isNaN(value)){
        return null
      }
      return value
    },
    format(value){
      if(typeof value !== 'number'){
        value = this.parseString(value)
      }
      if(!value){
        return null
      }
      return value.toLocaleString()
    }
  },
}
</script>

<style scoped>
</style>

