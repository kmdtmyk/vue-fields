<template lang='pug'>
  span
    input(
      :class='[defaultClass, classNames]'
      ref='input'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      v-for='(inputValue, index) in inputValues'
      v-model='inputValues[index]'
      :key='index'
      :autocomplete='useDropdown || $props.autocomplete === false ? "off" : $props.autocomplete'
      @mousedown='mousedown'
      @focus='focus'
      @focusout='focusout'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
    )
    dropdown-list(
      ref='dropdown'
      v-if='dropdownOpen'
      :records='dropdownRecords'
      :style='dropdownStyle'
      @input='select'
    )
</template>

<script>
import DropdownList from './DropdownList'
import dropdown from './mixins/dropdown'

export default {
  mixins: [dropdown],
  components: {
    DropdownList,
  },
  props: [
    'value',
    'defaultClass',
    'autocomplete',
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
      classNames: [],
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
        this.updateDropdownRecords()
      },
      immediate: true,
    },
    dropdownOpen(){
      this.updateDropdownRecords()
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
    useDropdown(){
      const {autocomplete} = this.$props
      if(autocomplete instanceof Array){
        return true
      }
      return false
    }
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
    },
    select(record){
      this.$emit('input', record)
    },
    updateDropdownRecords(){
      if(!this.useDropdown){
        return
      }
      this.dropdownRecords = this.defaultFilter(this.autocomplete, this.value)
    },
  },
}
</script>

<style lang='scss' scoped>
.dropdown-list{
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  background-color: white;
  max-height: 15.1em;
  overflow-y: auto;
  position: fixed;
  z-index: 9999;
}
</style>

