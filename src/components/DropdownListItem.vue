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
  padding: 0.2em 0.4em;

  &:not(.empty){
    cursor: pointer;
  }

  &.selected{
    background-color: #bedcf5;
  }

}
</style>
