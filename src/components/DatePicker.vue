<template lang='pug'>
.date-picker(@mousedown.prevent @wheel.prevent='wheel')
  header
    div
      button(type='button' @click='previousMonth' tabindex='-1') &lt;
      label {{calendarDates[7] | period}}
      button(type='button' @click='nextMonth' tabindex='-1') &gt;
    div
      button(type='button' @click='currentMonth' tabindex='-1') 今月
  .calendar(:class='animation')
    table
      thead
        tr
          th(v-for='dayName in dayNames') {{dayName}}
      transition-group(tag='tbody' @beforeEnter='transitionBeforeEnter' @afterLeave='transitionAfterLeave')
        tr(v-for='(n, y) in 6' :key='`${year}/${month}:${n}`')
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
  props: {
    value: {
      type: String,
    },
  },
  data(){
    const date = Midnight.parse(this.value) || new Midnight()
    const year = date.year()
    const month = date.month()
    return {
      year,
      month,
      dayNames: ['日', '月', '火', '水', '木', '金', '土'],
      animationCount: 0,
      animation: '',
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
    animating(){
      return 0 < this.animationCount
    },
  },
  methods: {
    transitionBeforeEnter(e){
      this.animationCount++
    },
    transitionAfterLeave(e){
      this.animationCount--
      if(this.animationCount == 0){
        this.animation = ''
      }
    },
    previousMonth(){
      if(this.animating){
        return
      }
      const date = new Midnight(this.year, this.month - 1, 1)
      this.year = date.year()
      this.month = date.month()
    },
    nextMonth(){
      if(this.animating){
        return
      }
      const date = new Midnight(this.year, this.month + 1, 1)
      this.year = date.year()
      this.month = date.month()
    },
    currentMonth(){
      if(this.animating){
        return
      }
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
      if(this.animating){
        return
      }
      if(0 < e.deltaY){
        this.animation = 'next'
        this.nextMonth()
      }else if(e.deltaY < 0){
        this.animation = 'previous'
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
.date-picker{
  $border-color: #ced4da;
  font-size: 14px;

  background-color: white;
  border: 1px solid $border-color;

  header, footer{
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

  .calendar{
    $row-height: 28px;
    height: $row-height * 6 + 23px;
    overflow: hidden;

    &.previous, &.next{
      .v-enter-active, .v-leave-active {
        transition: transform 0.3s;
        transition-timing-function: linear;
      }
    }

    &.next{
      .v-enter {
        transform: translateY(0);
      }
      .v-enter-to{
        transform: translateY($row-height * -6);
      }
      .v-leave{
        transform: translateY(0);
      }
      .v-leave-to{
        transform: translateY($row-height * -6);
      }
    }

    &.previous{
      .v-enter {
        transform: translateY($row-height * -6 * 2);
      }
      .v-enter-to{
        transform: translateY($row-height * -6);
      }
      .v-leave{
        transform: translateY(0);
      }
      .v-leave-to{
        transform: translateY($row-height * 6);
      }
    }

    table{
      border-collapse: collapse;
      transform-style: preserve-3d;
      thead{
        transform: translate3d(0, 0, 1px);
      }
      thead th{
        text-align: center;
        background-color: white;
      }
      tbody{
        tr{
          height: $row-height;
        }
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

  footer{
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  button{
    height: 2em;
    &:hover{
      cursor: pointer;
    }
  }

}
</style>

