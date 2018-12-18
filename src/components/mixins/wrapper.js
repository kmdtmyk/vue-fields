export default {
  data(){
    return {
      wrapperStyle: '',
    }
  },
  mounted(){
    console.log(this.$el)
    const style = this.$el.getAttribute('style')
    this.$el.removeAttribute('style')
    this.wrapperStyle = style
  },
}
