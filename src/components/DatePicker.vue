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
          td(v-for='(_, x) in 7')
            button(
              type='button'
              @click='select(calendarDates[x + y * 7])'
            ) {{calendarDates[x + y * 7] | day}}
    footer
      button(type='button' @click='today') 今日
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
    today(){
      this.select(new Date())
    },
    select(date){
      this.$emit('select', date)
    },
    wheel(e){
      if(0 < e.deltaY){
        this.nextMonth()
      }else if(e.deltaY < 0){
        this.previousMonth()
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.date-picker{
  background-color: white;
  border: 1px solid #ced4da;

  table{
    thead th{
      text-align: center;
    }
    tbody button{
      width: 100%;
    }
  }

}
</style>

