export default {
  data(){
    return {
      wrapperStyle: '',
    }
  },
  inheritAttrs: false,
  mounted(){
    extractWrapperStyle(this)
  },
  beforeUpdate(){
    extractWrapperStyle(this)
  },
}

const extractWrapperStyle = (component) => {
  const style = component.$el.getAttribute('style')
  if(style == null){
    return
  }
  component.$el.removeAttribute('style')
  component.wrapperStyle = style
}
