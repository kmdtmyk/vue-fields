<template lang='pug'>
  div(
    class='select-field-item'
    v-on='$listeners'
  )
    slot
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
.select-field-item{
  cursor: pointer;
  padding: 0.2em 0.4em;

  &.selected{
    background-color: #bedcf5;
  }

}
</style>
