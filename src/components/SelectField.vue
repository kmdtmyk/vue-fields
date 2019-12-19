<template lang='pug'>
dropdown-input(
  type='text'
  autocomplete='off'
  v-model='inputValue'
  v-bind='$attrs'
  :placeholder='placeholder'
  :clear='_isEmpty === false'
  :style='wrapperStyle'
  :inputClass='[inputClass, {empty: _isEmpty}]'
  :loading='loading || $attrs.loading'
  @input.native='_onInputNative'
  @keydown.up='_onKeydownUp'
  @keydown.down='_onKeydownDown'
  @keydown.enter='_onKeydownEnter'
  @keydown.delete='_onKeydownDelete'
  @blur='_onBlur'
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
  template(v-slot:tail='' v-if='$props.name != null')
    input(:name='$props.name' :value='value' type='hidden')
</template>

<script>
import debounce from 'lodash.debounce'
import wrapper from './mixins/wrapper'
import DropdownInput from './DropdownInput'
import DropdownList from './DropdownList'
import Arrays from './lib/Arrays'
import Strings from './lib/Strings'

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
    records: [Array, Function],
    recordKey: String,
    async: {
      type: Boolean,
      default: false,
    },
    asyncWait: {
      type: Number,
      default: 0,
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

        if(recordKey != null){
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
      if(this.async){
        return this.asyncRecords
      }else if(this.records instanceof Function){
        return this.records(this.inputValue)
      }
      return Arrays.search(this.records, this.inputValue)
    },
    placeholder(){
      if(this.selectedRecord){
        return this._recordText(this.selectedRecord)
      }
      if(Strings.isNotEmpty(this.value)){
        return this.value
      }
      return this.$attrs.placeholder
    },
    _isEmpty(){
      return Strings.isEmpty(this.value)
    },
    _callAsyncRecords(){
      return debounce((query) => {
        this.records(query).then((data) => {
          this.asyncRecords = data
          this.loading = false
        })
      }, this.asyncWait)
    }
  },
  methods: {
    _onInputNative(e){
      if(this.async === false){
        return
      }
      this._callAsyncRecords(this.inputValue)
      this.loading = Strings.isNotEmpty(this.inputValue)
    },
    _onKeydownUp(e){
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    _onKeydownDown(e){
      if(this.$refs.dropdown){
        this.$refs.dropdown.down()
      }
    },
    _onKeydownEnter(e){
      if(this.$refs.dropdown){
        e.preventDefault()
        this.$refs.dropdown.select()
      }
    },
    _onKeydownDelete(e){
      if(e.target.value === '' && this.value != null){
        this.clear()
      }
    },
    _onBlur(e){
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
      this.inputValue = this._recordText(record)
      const {recordKey} = this
      if(recordKey != null){
        this.$emit('input', record[recordKey])
      }else{
        this.$emit('input', record)
      }
    },
    _recordText(record){
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
