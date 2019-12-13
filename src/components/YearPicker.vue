<template lang='pug'>
.year-picker(@mousedown.prevent='' @wheel.prevent='wheel')
  header
    div
      button(type='button' @click='previous' tabindex='-1') &lt;
      label {{startYear}} 〜 {{endYear}}
      button(type='button' @click='next' tabindex='-1') &gt;
  .picker(:class='animation')
    table
      transition-group(tag='tbody' @beforeEnter='transitionBeforeEnter' @afterLeave='transitionAfterLeave')
        tr(v-for='(_, y) in 4' :key='`${startYear}:${y}`')
          td(v-for='(_, x) in 5')
            button(type='button' @click='select(startYear + x + y * 5)') {{startYear + x + y * 5}}
  footer
    button(type='button' @click='currentYear' tabindex='-1') 今年
    button(type='button' @click='clear' tabindex='-1') クリア
</template>

<script>
import Midnight from '@kmdtmyk/midnight'

const duration = 20

export default {
  props: {
    value: {
      type: [Number, String],
    },
  },
  data(){
    let year
    if(this.value == null || this.value === ''){
      year = new Midnight().year()
    }else{
      const date = new Midnight(this.value, 1, 1)
      year = date.year() || new Midnight().year()
    }
    const startYear = Math.floor(year / duration) * duration
    return {
      animationCount: 0,
      animation: '',
      startYear,
    }
  },
  computed: {
    animating(){
      return 0 < this.animationCount
    },
    endYear(){
      return this.startYear + duration - 1
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
    previous(){
      if(this.animating){
        return
      }
      this.startYear -= duration
    },
    next(){
      if(this.animating){
        return
      }
      this.startYear += duration
    },
    wheel(e){
      if(this.animating){
        return
      }
      if(0 < e.deltaY){
        this.animation = 'next'
        this.next()
      }else if(e.deltaY < 0){
        this.animation = 'previous'
        this.previous()
      }
    },
    select(year){
      this.$emit('input', year)
    },
    currentYear(){
      if(this.animating){
        return
      }
      const today = new Midnight()
      this.select(today.year())
    },
    clear(){
      this.$emit('input', null)
    },
  },
}
</script>

<style lang='scss' scoped>
.year-picker{
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
    $row-count: 4;
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

