<template lang='pug'>
.time-picker(@mousedown.prevent)
  header
    label {{time}}
  .picker
    .hour(v-if='selector == "hour"')
      table
        tr(v-for='_, y in 4')
          td(v-for='_, x in 6')
            button(type='button' @click='setHour(y * 6 + x)') {{y * 6 + x | button}}
    .minute(v-if='selector == "minute"')
      table
        tr(v-for='_, y in 6')
          td(v-for='_, x in 10')
            button(type='button' @click='setMinute(y * 10 + x)') {{y * 10 + x | button}}
    .second(v-if='selector == "second"')
      table
        tr(v-for='_, y in 6')
          td(v-for='_, x in 10')
            button(type='button' @click='setSecond(y * 10 + x)') {{y * 10 + x | button}}
  footer
    button(type='button' @click='now' tabindex='-1') 現在
    button(type='button' @click='clear' tabindex='-1') クリア
</template>

<script>
import dateformat from 'dateformat'

export default {
  props: {
    value: {
      type: String,
    },
  },
  data(){
    const hour = null
    const minute = null
    const second = null
    const selector = 'hour'
    return {
      hour,
      minute,
      second,
      selector,
    }
  },
  filters: {
    button(value){
      return `${value}`.padStart(2, 0)
    }
  },
  computed: {
    time(){
      const {hour, minute, second} = this
      const date = new Date(2000, 1, 1, hour, minute, second)
      if(date.valueOf()){
        return date.toLocaleTimeString()
      }else{
        return date.toLocaleTimeString()
      }
    },
  },
  methods: {
    setHour(hour){
      this.hour = hour
      this.next()
    },
    setMinute(minute){
      this.minute = minute
      this.next()
    },
    setSecond(second){
      this.second = second
      this.next()
    },
    next(){
      const {selector} = this
      if(selector === 'hour'){
        this.selector = 'minute'
      }else if(selector === 'minute'){
        this.selector = 'second'
      }else if(selector === 'second'){
        this.select(this.time)
      }else{
        this.selector = 'hour'
      }
    },
    select(value){
      this.$emit('input', value)
    },
    now(){
      const now = new Date()
      this.select(now.toLocaleTimeString())
    },
    clear(){
      this.select(null)
    },
  },
}
</script>

<style lang='scss' scoped>
.time-picker{
  $border-color: #ced4da;

  background-color: white;
  border: 1px solid $border-color;

  .picker table{
    font-size: 14px;
    border-collapse: collapse;

    td{
      padding: 0;
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


  button{
    height: 2em;
    &:hover{
      cursor: pointer;
    }
  }

}
</style>

