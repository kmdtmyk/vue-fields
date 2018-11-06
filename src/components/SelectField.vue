<template lang='pug'>
  .select-field
    input(
      :class='defaultClass'
      type='text'
      ref='input'
      v-bind='$attrs'
      v-model='inputValue'
      @mousedown='openDropdown = true'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
      @focus='focus'
      @focusout='focusout'
      @change='change'
      @input='openDropdown = true'
    )
    .remove(v-if='inputValue' tabIndex='-1' @click='remove')
    select-field-items(
      class='select-field-items'
      ref='dropdown'
      v-if='openDropdown'
      :records='filteredRecords'
      :style='dropdownStyle'
      @input='select'
    )
</template>

<script>
import SelectFieldItems from './SelectFieldItems'

export default {
  components: {
    SelectFieldItems,
  },
  props: [
    'value',
    'defaultClass',
    'records',
  ],
  inheritAttrs: false,
  data(){
    return {
      inputValue: '',
      openDropdown: false,
    }
  },
  mounted(){
    this.resetText()
  },
  watch: {
    value(){
      this.resetText()
    },
    records(){
      this.resetText()
    },
  },
  computed: {
    record(){
      return this.records.find((record) => {
        return record === this.value
      })
    },
    dropdownStyle(){
      const {input} = this.$refs
      const width = input.offsetWidth + 'px'
      const {fontSize} = window.getComputedStyle(input)
      return {width, fontSize}
    },
    filteredRecords(){
      if(!this.inputValue){
        return this.records
      }
      return this.records.filter(record => {
        return record.toLowerCase().includes(this.inputValue.toLowerCase())
      })
      return this.records
    },
  },
  methods: {
    focus(e){
      this.openDropdown = true
    },
    focusout(e){
      this.openDropdown = false
      this.resetText()
    },
    keydownUp(e){
      this.openDropdown = true
      setTimeout(() => {
        this.$refs.dropdown.up()
      })
    },
    keydownDown(e){
      if(!this.openDropdown){
        this.openDropdown = true
      }else{
        this.$refs.dropdown.down()
      }
    },
    keydownEnter(e){
      e.preventDefault()
      if(this.$refs.dropdown){
        this.$refs.dropdown.select()
      }
    },
    keydownEscape(e){
      this.closeDropdown()
    },
    change(e){
      if(!e.target.value){
        this.remove()
      }
    },
    closeDropdown(){
      this.openDropdown = false
    },
    select(record){
      this.inputValue = record
      this.$emit('input', record)
      this.closeDropdown()
    },
    remove(){
      this.$emit('input', null)
    },
    resetText(){
      this.inputValue = this.value
    },
  },
}
</script>

<style lang='scss' scoped>
.select-field{
  display: inline-block;
  position: relative;
  padding: 0;
}

.select-field-items{
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  background-color: white;
  max-height: 15.1em;
  overflow-y: auto;
  position: absolute;
  z-index: 9999;
}

.remove{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
}

.remove::after{
  content: '×';
  font-size: 1.2em;
}

.remove:focus{
  outline: none;
}

input{
  padding-right: 2em;
}
</style>
