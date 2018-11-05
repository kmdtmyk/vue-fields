<template lang='pug'>
  div(
    class='item'
    v-on='$listeners'
  )
    slot
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
.item{
  cursor: pointer;
  padding: 0.2em 0.4em;
}
.item.selected{
  background-color: #bedcf5;
}
</style>
