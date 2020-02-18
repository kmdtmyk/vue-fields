<template lang='pug'>
.month-picker(@mousedown.prevent='' @wheel.prevent='wheel')
  header
    div
      button(type='button' @click='previousYear' tabindex='-1') &lt;
      label {{year}}
      button(type='button' @click='nextYear' tabindex='-1') &gt;
    div
      button(type='button' @click='currentYear' tabindex='-1') {{l.thisYear}}
  .picker(:class='animation')
    table
      transition-group(
        tag='tbody'
        @beforeEnter='transitionBeforeEnter'
        @afterLeave='transitionAfterLeave'
      )
        tr(v-for='(_, y) in 3' :key='`${year}:${y}`')
          td(v-for='(_, x) in 4')
            button(type='button' @click='select(year, x + y * 4 + 1)')
              |{{l.monthNames[x + y * 4 + 1]}}
  footer
    button(type='button' @click='currentMonth' tabindex='-1') {{l.thisMonth}}
    button(type='button' @click='clear' tabindex='-1') {{l.clear}}
</template>

<script>
import dateformat from 'dateformat'
import Midnight from '@kmdtmyk/midnight'
import Locale from '../lib/Locale'

export default {
  props: {
    value: {
      type: String,
    },
  },
  data(){
    const date = Midnight.parse(this.value)
    const year = date == null ? new Midnight().year() : date.year()
    return {
      l: Locale.get(),
      year,
      animationCount: 0,
      animation: '',
    }
  },
  computed: {
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
    previousYear(){
      if(this.animating){
        return
      }
      this.year--
    },
    nextYear(){
      if(this.animating){
        return
      }
      this.year++
    },
    wheel(e){
      if(this.animating){
        return
      }
      if(0 < e.deltaY){
        this.animation = 'next'
        this.nextYear()
      }else if(e.deltaY < 0){
        this.animation = 'previous'
        this.previousYear()
      }
    },
    select(year, month){
      const date = new Midnight(year, month)
      this.$emit('input', dateformat(date, 'yyyy-mm'))
    },
    currentYear(){
      if(this.animating){
        return
      }
      const today = new Midnight()
      this.year = today.year()
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

  header, footer{
    padding: 2px;
    button{
      border: 0;
      background-color: #ccc;
      min-width: 1.5rem;
      &:hover{
        background-color: #bbb;
      }
    }
  }

  header{
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    label{
      margin: 0 0.4rem;
    }
  }

  footer{
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  .picker{
    $row-height: 32px;
    $row-count: 3;
    height: $row-height * $row-count;
    overflow: hidden;

    &.previous, &.next{
      .v-enter-active, .v-leave-active {
        transition: transform 0.2s;
        transition-timing-function: linear;
      }
    }

    &.next{
      .v-enter {
        transform: translateY(0);
      }
      .v-enter-to{
        transform: translateY($row-height * -$row-count);
      }
      .v-leave{
        transform: translateY(0);
      }
      .v-leave-to{
        transform: translateY($row-height * -$row-count);
      }
    }

    &.previous{
      .v-enter {
        transform: translateY($row-height * -$row-count * 2);
      }
      .v-enter-to{
        transform: translateY($row-height * -$row-count);
      }
      .v-leave{
        transform: translateY(0);
      }
      .v-leave-to{
        transform: translateY($row-height * $row-count);
      }
    }

    table{
      border-collapse: collapse;
      td{
        padding: 0;
        width: 3em;
        button{
          height: $row-height;
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

  button{
    height: 2em;
    &:hover{
      cursor: pointer;
    }
  }

}
</style>

