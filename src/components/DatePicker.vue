<template lang='pug'>
  .date-picker(@mousedown.prevent @wheel.prevent='wheel')
    header
      .month
        button(type='button' @click='previousMonth' tabindex='-1') &lt;
        label {{calendarDates[7] | period}}
        button(type='button' @click='nextMonth' tabindex='-1') &gt;
      .current
        button(type='button' @click='currentMonth' tabindex='-1') 今月
    .calendar
      table
        thead
          tr
            th(v-for='dayName in dayNames') {{dayName}}
        tbody
          tr(v-for='(_, y) in 6')
            td(v-for='(_, x) in 7' :class='tdClass(calendarDates[x + y * 7])')
              button(
                type='button'
                @click='select(calendarDates[x + y * 7])'
                tabindex='-1'
              ) {{calendarDates[x + y * 7] | day}}
    footer
      button(type='button' @click='today' tabindex='-1') 今日
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
      dayNames: ['日', '月', '火', '水', '木', '金', '土'],
    }
  },
  filters: {
    period(date){
      return dateformat(date, 'yyyy/mm')
    },
    day(date){
      return dateformat(date, 'd')
    },
  },
  computed: {
    calendarDates(){
      const startDate = new Midnight(this.year, this.month, 1).nextSunday(-1)
      const result = []
      for(let i = 0; i < 42; i++){
        result.push(startDate.nextDay(i - 1))
      }
      return result
    },
  },
  methods: {
    previousMonth(){
      const date = new Midnight(this.year, this.month - 1, 1)
      this.year = date.year()
      this.month = date.month()
    },
    nextMonth(){
      const date = new Midnight(this.year, this.month + 1, 1)
      this.year = date.year()
      this.month = date.month()
    },
    currentMonth(){
      const date = new Midnight()
      this.year = date.year()
      this.month = date.month()
    },
    select(date){
      if(!date){
        this.$emit('input', date)
      }else{
        this.$emit('input', dateformat(date, 'yyyy-mm-dd'))
      }
    },
    today(){
      this.select(new Date())
    },
    clear(){
      this.select('')
    },
    wheel(e){
      if(0 < e.deltaY){
        this.nextMonth()
      }else if(e.deltaY < 0){
        this.previousMonth()
      }
    },
    tdClass(date){
      const result = []
      const month = date.month()
      if(month === this.month){
        result.push('current-month')
      }else if(month < this.month){
        result.push('previous-month')
      }else if(this.month < month){
        result.push('next-month')
      }
      return result
    },
  },
}
</script>

<style lang='scss' scoped>
$border-color: #ced4da;

.date-picker{
  background-color: white;
  border: 1px solid $border-color;

  header, footer, .calendar{
    padding: 2px;
  }

  header{
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    button{
      min-width: 1.5rem;
    }
    label{
      margin: 0 0.4rem;
    }
  }

  footer{
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  table{
    border-collapse: collapse;
    thead th{
      text-align: center;
    }
    tbody{
      td{
        padding: 0;
        &.current-month{
          color: black;
        }
        &:not(.current-month){
          color: gray;
        }
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
  }

}

button{
  height: 2em;
  &:hover{
    cursor: pointer;
  }
}
</style>

