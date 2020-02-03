<template lang='pug'>
dropdown-input(
  type='text'
  autocomplete='off'
  v-model='inputValue'
  v-bind='$attrs'
  :placeholder='placeholder'
  :clear='isEmpty === false'
  :style='wrapperStyle'
  :inputClass='[inputClass, {empty: isEmpty}]'
  :loading='loading || $attrs.loading'
  @input.native='onInputNative'
  @keydown.up='onKeydownUp'
  @keydown.down='onKeydownDown'
  @keydown.enter='onKeydownEnter'
  @keydown.delete='onKeydownDelete'
  @blur='onBlur'
  @clear='clear'
)
  dropdown-list(
    ref='dropdown'
    v-if='dropdownRecords != null'
    :records='dropdownRecords'
    @input='select'
  )
    template(v-slot='{record}')
      slot(v-bind='{record}' v-if='$scopedSlots.default')
      template(v-else) {{record}}
    template(v-slot:empty='' v-if='$scopedSlots.empty && inputValue !== ""')
      slot(name='empty')
  template(v-slot:after='' v-if='$props.name != null')
    input(:name='$props.name' :value='value' type='hidden')
</template>

<script>
import debounce from 'lodash.debounce'
import wrapper from './mixins/wrapper'
import DropdownInput from './DropdownInput'
import DropdownList from './DropdownList'
import Arrays from '../lib/Arrays'
import Strings from '../lib/Strings'
import VueProps from '../lib/VueProps'

export default {
  mixins: [wrapper],
  components: {
    DropdownList,
    DropdownInput,
  },
  props: {
    value: [Number, String, Object],
    name: String,
    inputClass: [String, Array, Object],
    records: {
      type: [Array, Function],
      default(){
        return []
      },
    },
    recordKey: String,
    asyncWait: {
      type: Number,
    },
  },
  data(){
    return {
      loading: false,
      asyncRecords: [],
      selectedRecord: null,
      inputValue: '',
    }
  },
  watch: {
    value: {
      handler(value){
        const {recordKey} = this

        if(value instanceof Object){
          this.selectedRecord = value
          const {recordKey} = this
          if(recordKey != null){
            this.$emit('input', value[recordKey])
          }
        }

        if(recordKey != null && this.isAsync === false){
          const record = Arrays.from(this.records).find(record => {
            return record[recordKey] === value
          })
          if(record != null){
            this.selectedRecord = record
          }
        }

      },
      immediate: true,
    },
  },
  computed: {
    dropdownRecords(){
      if(this.isAsync){
        return this.asyncRecords
      }else if(this.records instanceof Function){
        return this.records(this.inputValue)
      }else if(Array.isArray(this.records)){
        return Arrays.search(this.records, this.inputValue)
      }
      return null
    },
    placeholder(){
      if(this.selectedRecord){
        return this.recordText(this.selectedRecord)
      }
      if(Strings.isNotEmpty(this.value)){
        return this.value
      }
      return this.$attrs.placeholder
    },
    isEmpty(){
      return Strings.isEmpty(this.value)
    },
    callAsyncRecords(){
      return debounce((query) => {
        const startTime = Date.now()
        this.records(query).then(
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
    isAsync(){
      if(this.asyncWait != null){
        return true
      }
      return VueProps.isAsyncFunction(this.records)
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
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    onKeydownDown(e){
      if(this.$refs.dropdown){
        this.$refs.dropdown.down()
      }
    },
    onKeydownEnter(e){
      const {dropdown} = this.$refs
      if(dropdown == null){
        return
      }
      if(dropdown.select() === true){
        e.preventDefault()
      }
    },
    onKeydownDelete(e){
      if(e.target.value === '' && this.value != null){
        this.clear()
      }
    },
    onBlur(e){
      this.inputValue = ''
    },
    clear(){
      this.selectedRecord = null
      this.$emit('input', null)
    },
    select(record){
      if(record instanceof Object){
        this.selectedRecord = record
      }
      this.inputValue = this.recordText(record)
      const {recordKey} = this
      if(recordKey != null){
        this.$emit('input', record[recordKey])
      }else{
        this.$emit('input', record)
      }
    },
    recordText(record){
      const slot = this.$scopedSlots.default
      if(slot != null){
        const vnode = slot({record})
        const text = vnode[0].text || vnode[0].children[0].text
        return text.trim()
      }
      return record
    },
  }
}
</script>

<style lang='scss' scoped>
/deep/ {
  input{
    &::placeholder{
      color: inherit;
      opacity: 0.7;
    }
    &:not(:focus):not(.empty)::placeholder{
      opacity: 1;
    }
  }
}
</style>
