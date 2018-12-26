export default class{

  static parseInt(value){
    if(value == null){
      return null
    }
    if(typeof value === 'number'){
      return parseInt(value)
    }
    if(typeof value === 'boolean'){
      return value + 0
    }
    let string
    if(typeof value === 'string'){
      string = value
    }else{
      string = value.toString()
    }
    string = string.normalize('NFKC')
    string = string.replace(/[^-\d\.]/g, '')
    const intValue = parseInt(string)
    if(isNaN(intValue)){
      return null
    }
    return intValue
  }

}
