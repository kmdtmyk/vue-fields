export default {
  data(){
    return {
      wrapperStyle: '',
    }
  },
  mounted(){
    const style = this.$el.getAttribute('style')
    this.$el.removeAttribute('style')
    this.wrapperStyle = style
  },
}
