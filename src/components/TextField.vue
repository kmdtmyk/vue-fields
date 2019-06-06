<template lang='pug'>
dropdown-input(
  ref='input'
  type='text'
  v-on='listeners'
  v-bind='$attrs'
  v-model='inputValue'
  :style='wrapperStyle'
  :defaultClass='defaultClass'
  :autocomplete='useDropdown || $props.autocomplete === false ? "off" : $props.autocomplete === true ? "on" : $props.autocomplete'
  @keydown.up='keydownUp'
  @keydown.down='keydownDown'
  @keydown.enter='keydownEnter'
)
  dropdown-list(
    ref='dropdown'
    v-if='useDropdown'
    :records='dropdownRecords'
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
    value: String,
    defaultClass: [String, Array],
    autocomplete: [String, Boolean, Array, Function],
  },
  data(){
    return {
      inputValue: '',
    }
  },
  watch: {
    value: {
      handler(value){
        this.inputValue = value
      },
      immediate: true,
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    useDropdown(){
      const {autocomplete} = this.$props
      if(autocomplete instanceof Array || autocomplete instanceof Function){
        return true
      }
      return false
    },
    dropdownRecords(){
      if(this.autocomplete instanceof Function){
        return this.autocomplete(this.inputValue)
      }
      return Arrays.search(this.autocomplete, this.inputValue)
    },
  },
  methods: {
    keydownUp(e){
      if(!this.useDropdown){
        return
      }
      const dropdown = this.$refs.dropdown
      e.preventDefault()
      if(dropdown){
        dropdown.up()
        return
      }
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    keydownDown(e){
      if(!this.useDropdown){
        return
      }
      const dropdown = this.$refs.dropdown
      e.preventDefault()
      if(dropdown){
        dropdown.down()
      }
    },
    keydownEnter(e){
      if(!this.useDropdown){
        return
      }
      const dropdown = this.$refs.dropdown
      if(dropdown){
        e.preventDefault()
        dropdown.select()
      }
    },
    input(e){
      this.$emit('input', e)
    },
    select(record){
      this.$emit('input', record)
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
