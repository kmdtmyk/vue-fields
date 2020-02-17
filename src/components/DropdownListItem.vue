<template lang='pug'>
div(
  class='dropdown-list-item'
  :class='{text: textSlot}'
  v-on='$listeners'
)
  slot
</template>

<script>
export default {
  data(){
    const defaultSlot = this.$slots.default
    const textSlot = defaultSlot != null && defaultSlot[0].children == null
    return {textSlot}
  },
}
</script>

<style lang='scss' scoped>
.dropdown-list-item{
  $padding: 0.2em 0.4em;

  &.text{
    padding: $padding;
  }

  > *{
    padding: $padding;
    display: block;
  }

  &:not(.empty){
    cursor: pointer;
  }

  $selected-color: #bedcf5;

  &.selected{
    background-color: $selected-color;
    > * {
      background-color: $selected-color !important;
    }
  }

}
</style>
