<template lang='pug'>
.month-picker(@mousedown.prevent @wheel.prevent='wheel')
  header
    button(type='button' @click='previousYear' tabindex='-1') &lt;
    label {{year}}
    button(type='button' @click='nextYear' tabindex='-1') &gt;
  table
    tbody
      tr(v-for='(_, y) in 4')
        td(v-for='(_, x) in 3')
          button(type='button' @click='select(x + y * 3 + 1)') {{x + y * 3 + 1}}月
</template>

<script>
import dateformat from 'dateformat'
import Midnight from '@kmdtmyk/midnight'

export default {
  data(){
    const date = new Midnight()
    const year = date.year()
    const month = date.month()
    return {
      year,
      month,
    }
  },
  methods: {
    previousYear(){
      this.year--
    },
    nextYear(){
      this.year++
    },
    wheel(e){
      if(0 < e.deltaY){
        this.nextYear()
      }else if(e.deltaY < 0){
        this.previousYear()
      }
    },
    select(month){
      const date = new Midnight(this.year, month)
      this.$emit('input', dateformat(date, 'yyyy-mm'))
    },
  },
}
</script>

<style lang='scss' scoped>
$border-color: #ced4da;

.month-picker{
  background-color: white;
  border: 1px solid $border-color;
}

header{
  display: flex;
  justify-content: space-between;
}

table{
  border-collapse: collapse;
  td{
    padding: 0;
    width: 3em;
    button{
      text-align: center;
      border: 0;
      background: none;
      color: inherit;
      width: 100%;
      &:hover{
        background: #bcd4fd;
      }
    }
  }
}

button{
  height: 2em;
  &:hover{
    cursor: pointer;
  }
}
</style>

