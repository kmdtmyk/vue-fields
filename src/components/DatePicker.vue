<template lang='pug'>
  div(@mousedown.prevent)
    table
      thead
        tr
          th(v-for='dayName in dayNames') {{dayName}}
      tbody
        tr(v-for='x in 5')
          td(v-for='y in 7') {{((x - 1) * 7 + y - 1) % 31 + 1}}
</template>

<script>

export default {
  data(){
    return {
      dayNames: ['日', '月', '火', '水', '木', '金', '土'],
    }
  },
}
</script>

<style scoped>
div{
  position: absolute;
  background-color: white;
  border: 1px solid #ced4da;
}
</style>

