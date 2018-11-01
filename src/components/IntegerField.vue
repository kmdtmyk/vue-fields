<template lang='pug'>
  input(
    :class='defaultClass'
    type='text'
    v-on='listeners'
    v-model='inputValue'
    @input='input'
    @focus='focus'
    @blur='blur'
    @drop='drop'
  )
</template>

<script>
export default {
  props: [
    'value',
    'defaultClass',
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
    $input(){
      return this.$el
    },
  },
  methods: {
    selectedAll(){
      return this.$el.value === window.getSelection().toString()
    },
    input(e){
      this.$emit('input', this.actualValue)
    },
    focus(e){
      const select = this.selectedAll()
      this.$nextTick(() => {
        const start = this.$input.selectionStart
        const leftText = this.$input.value.substr(0, start)
        const offset = leftText.length - this.parseString(leftText).toString().length
        this.inputValue = this.value
        this.$nextTick(() => {
          this.$input.setSelectionRange(start - offset, start - offset)
        })
      })
      if(select){
        setTimeout(() => {
          this.$input.select()
        })
      }
    },
    blur(e){
      this.inputValue = this.format(this.actualValue)
    },
    drop(e){
      setTimeout(() => {
        this.inputValue = this.value
      })
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

