<template lang='pug'>
  div.range-field
    input(
      type='range'
      :min='min'
      :max='max'
      :class='inputClass'
      :style='wrapperStyle'
      v-model.number='inputValue'
      v-on='listeners'
      v-bind='$attrs'
      @input='input'
      @mousedown='mousedown'
      @mouseup='mouseup'
    )
    .tooltip(
      v-if='enableTooltip && dragging'
      :style='tooltipStyle'
    ) {{tooltipValue}}
</template>

<script>
import wrapper from './mixins/wrapper'

export default {
  mixins: [wrapper],
  props: {
    value: {
      type: Number,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    tooltip: {
      type: [Boolean, Function],
      default: false,
    },
    inputClass: {
      type: [String, Array],
    },
  },
  data(){
    return {
      dragging: false,
      inputValue: null,
    }
  },
  watch: {
    value: {
      handler(value){
        if(this.dragging){
          this.$emit('input', this.inputValue)
          return
        }
        this.inputValue = value
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
    enableTooltip(){
      return this.tooltip == true || this.tooltip instanceof Function
    },
    tooltipValue(){
      if(this.tooltip instanceof Function){
        return this.tooltip(this.value)
      }else{
        return this.value
      }
    },
    tooltipStyle(){
      const percent = ((this.value - this.min) / (this.max - this.min)) * 100
      const left = `${percent}%`
      return {left}
    },
  },
  methods: {
    input(e){
      this.$emit('input', this.inputValue)
    },
    mousedown(e){
      this.dragging = true
    },
    mouseup(e){
      this.dragging = false
    },
  },
}
</script>

<style lang='scss' scoped>
.range-field{
  position: relative;
  display: inline-block;

  .tooltip{
    position: absolute;
    top: 3em;
    font-size: 0.8rem;
    padding: 0 0.2em;
    color: black;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);
  }

}
</style>
