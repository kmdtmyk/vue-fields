export default {
  data(){
    return {
      wrapperStyle: '',
    }
  },
  inheritAttrs: false,
  mounted(){
    const style = this.$el.getAttribute('style')
    this.$el.removeAttribute('style')
    this.wrapperStyle = style
  },
}
