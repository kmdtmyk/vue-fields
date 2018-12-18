export default class{

  static delegateAttribute(from, to, attribute){
    if(!from || !to || !attribute){
      return
    }
    const value = from.getAttribute(attribute)
    from.removeAttribute(attribute)
    if(Array.isArray(to)){
      to.forEach(to => to.setAttribute(attribute, value))
    }else{
      to.setAttribute(attribute, value)
    }
  }

}
