<template lang='pug'>
.loading-spinner
  .circle
  .circle
</template>

<script>
export default {
}
</script>

<style scoped>
.loading-spinner{
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;

  .circle{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border-radius: 100%;
  }

  .circle:nth-child(1){
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  .circle:nth-child(2){
    border: 2px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.4);
    animation-name: spinner;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

}

@keyframes spinner {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

}
</style>
