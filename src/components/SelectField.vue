<template lang='pug'>
  .select-field
    input(
      :class='defaultClass'
      type='text'
      ref='input'
      v-bind='$attrs'
      v-model='inputValue'
      :placeholder='placeholder'
      @keydown.delete='keydownDelete'
      @input='dropdownOpen = true'
      @focusout='focusout'
      :data-empty='empty'
      autocomplete='off'
      :style='wrapperStyle'

      @mousedown='mousedown'
      @focus='focus'
      @blur='blur'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
    )
    .control(v-if='loading')
      loading-spinner
    .control(v-else-if='!empty')
      .remove(tabIndex='-1' @click='remove')
    dropdown-list(
      ref='dropdown'
      v-if='dropdownOpen'
      :records='evaluatedRecords'
      :style='dropdownStyle'
      @input='select'
    )
      template(slot-scope='scope' v-if='$scopedSlots.default')
        slot(v-bind='scope')
    input(v-if='$props.name' :name='$props.name' :value='value' type='hidden')
</template>

<script>
import wrapper from './mixins/wrapper'
import dropdown from './mixins/dropdown'
import DropdownList from './DropdownList'
import LoadingSpinner from './LoadingSpinner'

export default {
  mixins: [wrapper, dropdown],
  components: {
    DropdownList,
    LoadingSpinner,
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
  mounted(){
    this.resetText()
  },
  watch: {
    records(){
      this.resetText()
    },
    inputValue: {
      handler(inputValue){
        this.updateDropdownRecords()
      },
      immediate: true,
    },
    dropdownOpen(){
      if(this.dropdownOpen){
        this.updateDropdownRecords()
      }
    },
  },
  computed: {
    allRecords(){
      if(!this.records){
        return []
      }
      if(this.records instanceof Function){
        return this.records()
      }
      return this.records
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
    empty(){
      return !this.value
    },
  },
  methods: {
    focusout(e){
      this.inputValue = ''
    },
    keydownDelete(e){
      if(!e.target.value && this.value){
        this.remove()
      }
    },
    select(record){
      this.inputValue = this.recordText(record)
      const {recordKey} = this
      if(recordKey){
        this.$emit('input', record[recordKey])
      }else{
        this.$emit('input', record)
      }
      this.dropdownOpen = false
    },
    remove(){
      this.$emit('input', null)
    },
    resetText(){
      this.inputValue = ''
    },
    recordText(record){
      const slot = this.$scopedSlots.default
      if(slot && record){
        return slot({record}).children[0].text
      }
      return record
    },
    updateDropdownRecords(){
      if(this.records instanceof Function){
        this.evaluatedRecords = this.records(this.inputValue)
      }else{
        const records = this.records || []
        if(this.inputValue){
          this.evaluatedRecords = this.defaultFilter(records, this.inputValue)
        }else{
          this.evaluatedRecords = records
        }
      }
      if(!this.evaluatedRecords){
        this.evaluatedRecords = []
      }
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

  .control{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8em;
  }

  .remove{
    text-align: center;
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
