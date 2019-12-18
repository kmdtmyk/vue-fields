<template lang='pug'>
.dropdown-list(
  ref='dropdown'
  v-if='0 < records.length || $scopedSlots.empty != null'
  @mouseleave='selectedIndex = null'
)
  dropdown-list-item(
    v-if='0 < records.length'
    v-for='(record, index) in records'
    :class='{selected: selectedIndex === index}'
    :key='index'
    @mousemove='selectedIndex = index'
    @mousedown='select'
  )
    slot(v-bind='{record}' v-if='$scopedSlots.default')
    template(v-else) {{record}}
  dropdown-list-item.empty(v-if='$scopedSlots.empty != null && records.length === 0')
    slot(name='empty')
</template>

<script>
import DropdownListItem from './DropdownListItem'

export default {
  components: {
    DropdownListItem,
  },
  props: {
    records: {
      type: Array,
      default(){
        return []
      },
    },
  },
  data(){
    return {
      selectedIndex: 0,
    }
  },
  watch: {
    records(newValue, oldValue){
      if(newValue === oldValue){
        return
      }
      this.selectedIndex = 0
      this.autoScroll()
    },
  },
  methods: {
    up(){
      const current = this.selectedIndex
      const next = current - 1
      const {length} = this.records
      this.selectedIndex = (next + length) % length
      this.autoScroll()
    },
    down(){
      const current = this.selectedIndex
      const next = current === null ? 0 : current + 1
      const {length} = this.records
      this.selectedIndex = (next + length) % length
      this.autoScroll()
    },
    select(){
      const record = this.records[this.selectedIndex]
      if(record === undefined){
        return
      }
      this.$emit('input', record)
    },
    autoScroll(){
      const {dropdown} = this.$refs
      if(dropdown == null || dropdown.children == null){
        return
      }
      const selected = dropdown.children[this.selectedIndex]
      if(selected == null){
        return
      }
      const topOver = dropdown.scrollTop - selected.offsetTop
      const bottomOver = selected.offsetTop + selected.offsetHeight - dropdown.scrollTop - dropdown.offsetHeight
      if(0 < topOver){
        dropdown.scrollTop = dropdown.scrollTop - topOver
      }else if(0 < bottomOver){
        dropdown.scrollTop = dropdown.scrollTop + bottomOver
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.dropdown-list{
  max-height: 15.1em;
  overflow-y: auto;
  word-break: break-all;
}
</style>
