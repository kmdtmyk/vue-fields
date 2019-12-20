export default class{

  static isAsyncFunction(prop){
    if(prop instanceof Function === false){
      return false
    }
    if(prop.constructor.name === 'AsyncFunction'){
      return true
    }
    return prop.toString().includes('.apply(this, arguments);')
  }

  static toOnOff(prop){
    if(prop === true || prop === 'on'){
      return 'on'
    }
    if(prop === false || prop === 'off'){
      return 'off'
    }
    return null
  }

}
