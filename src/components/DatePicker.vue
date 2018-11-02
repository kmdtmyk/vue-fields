<template lang='pug'>
  .date-picker(@mousedown.prevent @wheel='wheel')
    header
      button(type='button' @click='previous') &lt;
      label {{year}}/{{month}}
      button(type='button' @click='next') &gt;
      button(type='button' @click='currentMonth') 今月
    table
      thead
        tr
          th(v-for='dayName in dayNames') {{dayName}}
      tbody
        tr(v-for='x in 6')
          td(v-for='y in 7')
            button(
              type='button'
              @click='select(new Date(startYear, startMonth - 1, startDay + (x - 1) * 7 + y))'
            ) {{new Date(startYear, startMonth - 1, startDay + (x - 1) * 7 + y) | day}}
    footer
      button(type='button' @click='today') 今日
</template>

<script>
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
  },
  methods: {
    today(){
      this.$emit('select', new Date())
    },
    currentMonth(){
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    previous(){
      const date = new Date(this.year, this.month - 2)
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    next(){
      const date = new Date(this.year, this.month)
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    select(date){
      this.$emit('select', date)
    },
    wheel(e){
      // console.log(e)
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

