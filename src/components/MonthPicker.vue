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
          button(type='button' @click='select(year, x + y * 3 + 1)') {{x + y * 3 + 1}}月
  footer
    button(type='button' @click='currentMonth' tabindex='-1') 今月
    button(type='button' @click='clear' tabindex='-1') クリア
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
    select(year, month){
      const date = new Midnight(year, month)
      this.$emit('input', dateformat(date, 'yyyy-mm'))
    },
    currentMonth(){
      const today = new Midnight()
      this.select(today.year(), today.month())
    },
    clear(){
      this.$emit('input', null)
    },
  },
}
</script>

<style lang='scss' scoped>
.month-picker{
  $border-color: #ced4da;

  background-color: white;
  border: 1px solid $border-color;

  header{
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  footer{
    border-top: 1px solid $border-color;
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

}
</style>

