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
      if(!this.active){
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
    active(){
      return this.$el === document.activeElement
    },
  },
  methods: {
    selectedAll(){
      const input = this.$input
      const start = input.selectionStart
      const end = input.selectionEnd
      const value = input.value
      return start === 0 && end === value.length
    },
    input(e){
      this.$emit('input', this.actualValue)
    },
    focus(e){
      const select = this.selectedAll()
      this.$nextTick(() => {
        this.inputValue = this.value
        if(select){
          this.$nextTick(() => {
            this.$input.select()
          })
        }else{
          const start = this.$input.selectionStart
          const leftText = this.$input.value.substr(0, start)
          const offset = leftText.length - this.parseString(leftText).toString().length
          this.$nextTick(() => {
            this.$input.setSelectionRange(start - offset, start - offset)
          })
        }
      })
    },
    blur(e){
      this.inputValue = this.format(this.actualValue)
    },
    drop(e){
      const text = e.dataTransfer.getData('text')
      this.inputValue = this.value
      setTimeout(() => {
        const start = this.$input.selectionStart
        this.$input.setSelectionRange(start, start + text.length)
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

