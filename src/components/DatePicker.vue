<template lang='pug'>
  .date-picker(@mousedown.prevent @wheel='wheel')
    header
      button(type='button' @click='previousMonth') &lt;
      label {{new Date(year, month - 1) | period}}
      button(type='button' @click='nextMonth') &gt;
      button(type='button' @click='currentMonth') 今月
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
            ) {{calendarDates[x + y * 7] | day}}
    footer
      button(type='button' @click='today') 今日
      button(type='button' @click='clear') クリア
</template>

<script>
import dateformat from 'dateformat'

export default {
  data(){
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
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
      return date.getDate()
    },
  },
  computed: {
    startDayOfWeek(){
      return 0
    },
    startDate(){
      for(let i = 0; i < 7; i++){
        const date = new Date(this.year, this.month - 1, -i - 1)
        if(date.getDay() === this.startDayOfWeek){
          return date
        }
      }
    },
    startYear(){
      return this.startDate.getFullYear()
    },
    startMonth(){
      return this.startDate.getMonth() + 1
    },
    startDay(){
      return this.startDate.getDate()
    },
    calendarDates(){
      const result = []
      for(let i = 0; i < 42; i++){
        result.push(new Date(this.startYear, this.startMonth - 1, this.startDay + i))
      }
      return result
    }
  },
  methods: {
    previousMonth(){
      const date = new Date(this.year, this.month - 2)
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    nextMonth(){
      const date = new Date(this.year, this.month)
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    currentMonth(){
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
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
      const month = date.getMonth() + 1
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

  header{
    border-bottom: 1px solid $border-color;
  }
  footer{
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  table{
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
</style>

