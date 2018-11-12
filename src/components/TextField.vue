<template lang='pug'>
  input(
    :class='defaultClass'
    type='text'
    v-on='listeners'
    v-model='inputValue'
  )
</template>

<script>
export default {
  props: [
    'value',
    'defaultClass',
  ],
  data(){
    return {
      inputValue: this.value
    }
  },
  watch: {
    value(){
      this.inputValue = this.value
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
  },
  methods: {
    input(e){
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>
</style>

