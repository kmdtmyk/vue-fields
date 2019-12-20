export default class{

  static parseInt(value){
    if(value == null){
      return null
    }
    if(typeof value === 'boolean'){
      return value + 0
    }
    if(typeof value === 'number'){
      return parseInt(value)
    }
    const string = toNumberString(value)
    const intValue = parseInt(string)
    if(isNaN(intValue)){
      return null
    }
    return intValue
  }

  static parseFloat(value){
    if(value == null){
      return null
    }
    if(typeof value === 'boolean'){
      return value + 0
    }
    if(typeof value === 'number'){
      return parseFloat(value)
    }
    const string = toNumberString(value)
    const intValue = parseFloat(string)
    if(isNaN(intValue)){
      return null
    }
    return intValue
  }

}

function toNumberString(value){
  let string
  if(typeof value === 'string'){
    string = value
  }else{
    string = value.toString()
  }
  string = string.normalize('NFKC')
  string = string.replace(/[^-\d\.]/g, '')
  return string
}
