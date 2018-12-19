<template lang='pug'>
  dropdown-input.select-field(
    v-model='inputValue'
    @keydown.up='keydownUp'
    @keydown.down='keydownDown'
    @keydown.enter='keydownEnter'
    @keydown.delete='keydownDelete'
    @blur='blur'
    @clear='clear'
    v-bind='$attrs'
    :placeholder='placeholder'
    :clear='!!value'
  )
    dropdown-list(
      ref='dropdown'
      :records='filteredRecords'
      @input='select'
    )
      template(slot-scope='scope' v-if='$scopedSlots.default')
        slot(v-bind='scope')
</template>

<script>
import DropdownList from './DropdownList'
import Arrays from './lib/Arrays'
import DropdownInput from './DropdownInput'

export default {
  components: {
    DropdownList,
    DropdownInput,
  },
  props: {
    value: [Number, String],
    name: String,
    defaultClass: [String, Array],
    records: [Array, Function],
    recordKey: String,
  },
  data(){
    return {
      inputValue: '',
      loading: false,
    }
  },
  computed: {
    filteredRecords(){
      if(this.records instanceof Function){
        return this.records(this.inputValue)
      }
      return Arrays.search(this.records, this.inputValue)
    },
    allRecords(){
      if(this.records instanceof Function){
        return this.records() || []
      }
      return this.records || []
    },
    selectedRecord(){
      const {recordKey} = this
      return this.allRecords.find(record => {
        if(recordKey){
          return record[recordKey] === this.value
        }
        return record === this.value
      })
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
      if(!e.target.value && this.value){
        this.remove()
      }
    },
    blur(e){
      this.inputValue = ''
    },
    clear(){
      this.$emit('input', null)
    },
    select(record){
      this.inputValue = this.recordText(record)
      const {recordKey} = this
      if(recordKey){
        this.$emit('input', record[recordKey])
      }else{
        this.$emit('input', record)
      }
    },
    remove(){
      this.$emit('input', null)
    },
    recordText(record){
      const slot = this.$scopedSlots.default
      if(slot && record){
        return slot({record}).children[0].text
      }
      return record
    },
  }
}
</script>

<style lang='scss'>
.select-field{
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
