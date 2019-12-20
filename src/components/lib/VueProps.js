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

}
