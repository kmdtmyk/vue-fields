<template lang='pug'>
dropdown-input(
  ref='input'
  type='text'
  v-on='listeners'
  v-bind='$attrs'
  v-model='inputValue'
  :style='wrapperStyle'
  :inputClass='inputClass'
  :autocomplete='autocompleteAttribute'
  :loading='loading || $attrs.loading'
  @input.native='onInputNative'
  @keydown.up='onKeydownUp'
  @keydown.down='onKeydownDown'
  @keydown.enter='onKeydownEnter'
  @focus='onFocus'
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
import Arrays from '../lib/Arrays'
import Strings from '../lib/Strings'
import VueProps from '../lib/VueProps'
import DebounceFunction from '../lib/DebounceFunction'

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
      type: [Number, Function],
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
    autocompleteAttribute(){
      if(this.useDropdown){
        return 'off'
      }
      return VueProps.toOnOff(this.autocomplete)
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
      if(this.asyncWait != null){
        return true
      }
      return VueProps.isAsyncFunction(this.autocomplete)
    },
    asyncRecordsFunction(){
      return new DebounceFunction((query) => {
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
      })
    },
  },
  methods: {
    onFocus(e){
      if(this.isAsync === true && Arrays.isNullOrEmpty(this.asyncRecords)){
        this.callAsyncRecords()
      }
    },
    onInputNative(e){
      if(this.isAsync === true){
        this.callAsyncRecords()
      }
    },
    callAsyncRecords(){
      let wait
      if(this.asyncWait instanceof Function){
        wait = this.asyncWait(this.inputValue)
      }else{
        wait = this.asyncWait
      }
      this.asyncRecordsFunction.call({
        wait,
        arguments: [this.inputValue],
      })
      this.loading = true
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
      const {dropdown} = this.$refs
      if(dropdown == null){
        return
      }
      if(dropdown.select() === true){
        e.preventDefault()
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
