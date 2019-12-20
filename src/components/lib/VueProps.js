export default class{

  static isAsyncFunction(prop){
    if(prop instanceof Function === false){
      return false
    }
    if(prop.constructor.name === 'AsyncFunction'){
      return true
    }
    const {name} = prop
    return prop.toString()
      .includes(`return _${name}.apply(this, arguments);`)
  }

}
