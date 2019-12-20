<template lang='pug'>
dropdown-input(
  ref='input'
  type='text'
  v-on='listeners'
  v-bind='$attrs'
  v-model='inputValue'
  :style='wrapperStyle'
  :inputClass='inputClass'
  :autocomplete='useDropdown || $props.autocomplete === false ? "off" : $props.autocomplete === true ? "on" : $props.autocomplete'
  :loading='loading || $attrs.loading'
  @input.native='onInputNative'
  @keydown.up='onKeydownUp'
  @keydown.down='onKeydownDown'
  @keydown.enter='onKeydownEnter'
)
  dropdown-list(
    ref='dropdown'
    v-if='useDropdown'
    :records='dropdownRecords'
    @input='select'
  )
</template>

<script>
import debounce from 'lodash.debounce'
import wrapper from './mixins/wrapper'
import DropdownInput from './DropdownInput'
import DropdownList from './DropdownList'
import Arrays from './lib/Arrays'
import Strings from './lib/Strings'
import VueProps from './lib/VueProps'

export default {
  mixins: [wrapper],
  components: {
    DropdownInput,
    DropdownList,
  },
  props: {
    value: String,
    inputClass: [String, Array, Object],
    autocomplete: [String, Boolean, Array, Function],
    asyncWait: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      loading: false,
      asyncRecords: [],
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
      if(this.isAsync){
        return this.asyncRecords
      }else if(this.autocomplete instanceof Function){
        return this.autocomplete(this.inputValue)
      }
      return Arrays.search(this.autocomplete, this.inputValue)
    },
    isAsync(){
      return VueProps.isAsyncFunction(this.autocomplete)
    },
    callAsyncRecords(){
      return debounce((query) => {
        const startTime = Date.now()
        this.autocomplete(query).then(
          (data) => {
            if(startTime < this.lastAsyncRecordsTime){
              return
            }
            this.lastAsyncRecordsTime = startTime
            this.asyncRecords = data
            this.loading = false
          },
          (error) => {
            this.loading = false
          }
        )
      }, this.asyncWait)
    },
  },
  methods: {
    onInputNative(e){
      if(this.isAsync === false){
        return
      }
      this.callAsyncRecords(this.inputValue)
      this.loading = Strings.isNotEmpty(this.inputValue)
    },
    onKeydownUp(e){
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
    onKeydownDown(e){
      if(!this.useDropdown){
        return
      }
      const dropdown = this.$refs.dropdown
      e.preventDefault()
      if(dropdown){
        dropdown.down()
      }
    },
    onKeydownEnter(e){
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
