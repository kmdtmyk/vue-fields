<template lang='pug'>
  div(
    class='dropdown-list-item'
    v-on='$listeners'
  )
    slot
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
.dropdown-list-item{
  cursor: pointer;
  padding: 0.2em 0.4em;

  &.selected{
    background-color: #bedcf5;
  }

}
</style>
