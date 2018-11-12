<template lang='pug'>
  span
    input(
      :class='defaultClass'
      type='text'
      v-on='listeners'
      v-bind='$attrs'
      v-for='(inputValue, index) in inputValues'
      :value='inputValue'
      :key='index'
    )
</template>

<script>
export default {
  props: [
    'value',
    'defaultClass',
  ],
  inheritAttrs: false,
  watch: {
    value: {
      handler(value){
        if(this.multiple){
          this.inputValues = [...this.value, '']
        }else{
          this.inputValues = [this.value]
        }
      },
      immediate: true,
    },
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.input,
      }
    },
    multiple(){
      return Array.isArray(this.value)
    },
  },
  methods: {
    input(e){
      if(this.multiple){
        const index = [...this.$el.childNodes].findIndex(it => it === e.target)
        const value = [...this.value]
        value[index] = e.target.value
        this.$emit('input', value)
      }else{
        this.$emit('input', e.target.value)
      }
    },
  },
}
</script>

<style scoped>
</style>

