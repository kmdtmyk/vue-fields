<template lang='pug'>
  .select-field
    input(
      :class='defaultClass'
      type='text'
      ref='input'
      v-bind='$attrs'
      v-model='inputValue'
      :placeholder='placeholder'
      @mousedown='openDropdown = true'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
      @focus='focus'
      @focusout='focusout'
      @change='change'
      @input='openDropdown = true'
      :data-empty='empty'
    )
    .remove(v-if='!empty' tabIndex='-1' @click='remove')
    select-field-items(
      class='select-field-items'
      ref='dropdown'
      v-if='openDropdown'
      :records='evaluatedRecords'
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
      focused: false,
    }
  },
  mounted(){
    this.resetText()
  },
  watch: {
    records(){
      this.resetText()
    },
    inputValue: {
      async handler(inputValue){
        this.evaluatedRecords = []
        if(this.records instanceof Function){
          const records = this.records(this.inputValue)
          if(records instanceof Promise){
            this.evaluatedRecords = await records
            this.$forceUpdate()
          }else{
            this.evaluatedRecords = records
          }
        }else{
          const records = this.records || []
          if(this.inputValue){
            this.evaluatedRecords = this.defaultFilter(records, this.inputValue)
          }else{
            this.evaluatedRecords = records
          }
        }
      },
      immediate: true,
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
    placeholder(){
      return this.value || this.$attrs.placeholder
    },
    empty(){
      return !this.value
    },
  },
  methods: {
    focus(e){
      this.openDropdown = true
      this.focused = true
      this.$nextTick(() => {
        this.inputValue = ''
      })
    },
    focusout(e){
      this.openDropdown = false
      this.resetText()
      this.focused = false
      this.inputValue = ''
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
      this.inputValue = ''
    },
    defaultFilter(records, query){
      return records.filter(record => {
        return record.toLowerCase().includes(query.toLowerCase())
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.select-field{
  display: inline-block;
  position: relative;
  padding: 0;

  input{
    padding-right: 2em;

    &::placeholder{
      color: inherit;
      opacity: 0.7;
    }

    &:not(:focus):not([data-empty='true'])::placeholder{
      opacity: 1;
    }

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

}
</style>
