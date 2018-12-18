<template lang='pug'>
  .select-field
    input(
      :class='defaultClass'
      type='text'
      ref='input'
      v-bind='$attrs'
      v-model='inputValue'
      :placeholder='placeholder'
      @mousedown='openDropdown = true'
      @keydown.up='keydownUp'
      @keydown.down='keydownDown'
      @keydown.enter='keydownEnter'
      @keydown.27='keydownEscape'
      @keydown.delete='keydownDelete'
      @focus='focus'
      @focusout='focusout'
      @input='openDropdown = true'
      :data-empty='empty'
      autocomplete='off'
      :style='wrapperStyle'
    )
    .control
      loading-spinner(v-if='loading')
      .remove(v-else-if='!empty' tabIndex='-1' @click='remove')
    dropdown-list(
      ref='dropdown'
      v-if='openDropdown'
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
import DropdownList from './DropdownList'
import LoadingSpinner from './LoadingSpinner'

export default {
  mixins: [wrapper],
  components: {
    DropdownList,
    LoadingSpinner,
  },
  props: {
    value: [Number, String],
    name: String,
    defaultClass: [String, Array],
    records: [Array, Function],
    name: String,
  },
  inheritAttrs: false,
  data(){
    return {
      inputValue: '',
      openDropdown: false,
      focused: false,
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
      async handler(inputValue){
        if(this.evaluatedRecords && !this.openDropdown){
          return
        }
        if(!this.evaluatedRecords){
          this.evaluatedRecords = []
        }
        if(this.records instanceof Function){
          const records = this.records(this.inputValue)
          if(records instanceof Promise){
            this.loading = true
            this.evaluatedRecords = await records
            this.loading = false
            this.$forceUpdate()
          }else{
            this.evaluatedRecords = records
          }
        }else{
          const records = this.records || []
          if(this.inputValue){
            this.evaluatedRecords = this.defaultFilter(records, this.inputValue)
          }else{
            this.evaluatedRecords = records
          }
        }
      },
      immediate: true,
    },
    openDropdown(){
      this.updateDropdownStyle()
      let elements = getParentElements(this.$el)
      if(this.openDropdown){
        elements.forEach(element => {
          element.addEventListener('scroll', this.onParentScroll)
        })
        addEventListener('resize', this.onWindowResize)
      }else{
        elements.forEach(element => {
          element.removeEventListener('scroll', this.onParentScroll)
        })
        removeEventListener('resize', this.onWindowResize)
      }
      if(!this.openDropdown){
        this.loading = false
      }
    },
  },
  computed: {
    asyncRecords(){
      const {records} = this
      return records instanceof Function && records() instanceof Promise
    },
    selectedRecord(){
      const records = this.evaluatedRecords || []
      const {recordKey} = this
      return records.find(record => {
        if(recordKey){
          return record[recordKey] === this.value
        }
        return record === this.value
      })
    },
    placeholder(){
      if(this.asyncRecords){
        return this.value
      }
      if(this.selectedRecord){
        return this.recordText(this.selectedRecord)
      }
      return this.$attrs.placeholder
    },
    empty(){
      return !this.value
    },
  },
  methods: {
    focus(e){
      this.openDropdown = true
      this.focused = true
    },
    focusout(e){
      this.openDropdown = false
      this.resetText()
      this.focused = false
      this.inputValue = ''
    },
    keydownUp(e){
      this.openDropdown = true
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    keydownDown(e){
      if(!this.openDropdown){
        this.openDropdown = true
      }else{
        this.$refs.dropdown.down()
      }
    },
    keydownEnter(e){
      e.preventDefault()
      if(this.$refs.dropdown){
        this.$refs.dropdown.select()
      }
    },
    keydownEscape(e){
      this.closeDropdown()
    },
    keydownDelete(e){
      if(!e.target.value && this.value){
        this.remove()
      }
    },
    closeDropdown(){
      this.openDropdown = false
    },
    select(record){
      this.inputValue = this.recordText(record)
      const {recordKey} = this
      if(recordKey){
        this.$emit('input', record[recordKey])
      }else{
        this.$emit('input', record)
      }
      this.closeDropdown()
    },
    remove(){
      this.$emit('input', null)
    },
    resetText(){
      this.inputValue = ''
    },
    defaultFilter(records, query){
      return records.filter(record => {
        return record.toLowerCase().includes(query.toLowerCase())
      })
    },
    onParentScroll(e){
      this.openDropdown = false
      // this.updateDropdownStyle()
      // this.$forceUpdate()
    },
    onWindowResize(e){
      this.openDropdown = false
      // this.updateDropdownStyle()
      // this.$forceUpdate()
    },
    updateDropdownStyle(){
      if(!this.openDropdown){
        return
      }
      const {input} = this.$refs
      const {fontSize} = getComputedStyle(input)
      const rect = input.getBoundingClientRect()
      const left = `${rect.x}px`
      const top = `${rect.height + rect.y}px`
      const width = `${rect.width}px`
      this.dropdownStyle = {fontSize, width, left, top}
    },
    recordText(record){
      const slot = this.$scopedSlots.default
      if(slot && record){
        return slot({record}).children[0].text
      }
      return record
    },
  },
}

function getParentElements(element){
  const result = []
  let currentElement = element
  while(currentElement){
    result.push(currentElement)
    currentElement = currentElement.parentElement
  }
  result.push(document)
  return result
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
