<template lang='pug'>
dropdown-input(
  type='text'
  autocomplete='off'
  v-model='inputValue'
  v-bind='$attrs'
  :placeholder='placeholder'
  :clear='value != null && value !== ""'
  :style='wrapperStyle'
  :inputClass='inputClass'
  @keydown.up='keydownUp'
  @keydown.down='keydownDown'
  @keydown.enter='keydownEnter'
  @keydown.delete='keydownDelete'
  @blur='blur'
  @clear='clear'
)
  dropdown-list(
    ref='dropdown'
    :records='filteredRecords'
    @input='select'
  )
    template(v-slot='{record}')
      slot(v-bind='{record}' v-if='$scopedSlots.default')
      template(v-else) {{record}}
  template(v-slot:tail='' v-if='$props.name != null')
    input(:name='$props.name' :value='value' type='hidden')
</template>

<script>
import wrapper from './mixins/wrapper'
import DropdownInput from './DropdownInput'
import DropdownList from './DropdownList'
import Arrays from './lib/Arrays'

export default {
  mixins: [wrapper],
  components: {
    DropdownList,
    DropdownInput,
  },
  props: {
    value: [Number, String, Object],
    name: String,
    inputClass: [String, Array],
    filter: {
      type: Function,
      default: Arrays.search,
    },
    records: [Array, Function],
    recordKey: String,
  },
  data(){
    return {
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
    filteredRecords(){
      if(this.records instanceof Function){
        return this.records(this.inputValue)
      }
      return this.filter(this.records, this.inputValue)
    },
    placeholder(){
      if(this.selectedRecord){
        return this.recordText(this.selectedRecord)
      }
      return this.value || this.$attrs.placeholder
    },
  },
  methods: {
    keydownUp(e){
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    keydownDown(e){
      if(this.$refs.dropdown){
        this.$refs.dropdown.down()
      }
    },
    keydownEnter(e){
      if(this.$refs.dropdown){
        e.preventDefault()
        this.$refs.dropdown.select()
      }
    },
    keydownDelete(e){
      if(e.target.value === '' && this.value != null){
        this.clear()
      }
    },
    blur(e){
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
      if(slot && record){
        return slot({record})[0].children[0].text
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
    &:not(:focus)::placeholder{
      opacity: 1;
    }
  }
}
</style>
