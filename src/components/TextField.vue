<template lang='pug'>
.text-field
  dropdown-input(
    :class='defaultClass'
    ref='input'
    type='text'
    v-on='listeners'
    v-bind='$attrs'
    v-for='(inputValue, index) in inputValues'
    v-model='inputValues[index]'
    :key='index'
    :autocomplete='useDropdown || $props.autocomplete === false ? "off" : $props.autocomplete === true ? "on" : $props.autocomplete'
    :style='wrapperStyle'
  )
    dropdown-list(
      v-if='useDropdown'
      ref='dropdown'
      :records='getDropdownRecords(inputValues[index])'
      @input='select'
    )
</template>

<script>
import wrapper from './mixins/wrapper'
import DropdownInput from './DropdownInput'
import DropdownList from './DropdownList'
import Arrays from './lib/Arrays'

export default {
  mixins: [wrapper],
  components: {
    DropdownInput,
    DropdownList,
  },
  props: {
    value: [String, Array],
    defaultClass: [String, Array],
    autocomplete: [String, Boolean, Array, Function],
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
    useDropdown(){
      const {autocomplete} = this.$props
      if(autocomplete instanceof Array || autocomplete instanceof Function){
        return true
      }
      return false
    },
  },
  methods: {
    input(e){
      if(!this.multiple){
        this.$emit('input', e)
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
    getDropdownRecords(query){
      if(this.autocomplete instanceof Function){
        return this.autocomplete(query)
      }
      return Arrays.search(this.autocomplete, query)
    }
  },
}
</script>

<style lang='scss' scoped>
.text-field{
  display: inline-block;
}
</style>

