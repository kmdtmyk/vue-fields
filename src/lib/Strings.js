export default class{

  static includes(text, value, options = {}){
    if(this.isEmpty(text) || this.isEmpty(value)){
      return false
    }
    if(options.ignoreCase === true){
      return text.toString().toLowerCase().includes(value.toLowerCase())
    }else{
      return text.toString().includes(value)
    }
  }

  static isBlank(value){
    if(value == null){
      return true
    }

    return /^\s*$/.test(value)
  }

  static isNotBlank(value){
    return this.isBlank(value) === false
  }

  static isEmpty(value){
    if(value == null){
      return true
    }

    return value === ''
  }

  static isNotEmpty(value){
    return this.isEmpty(value) === false
  }

  static toUpperCaseFirst(value){
    if(value == null){
      return value
    }
    if(value === ''){
      return ''
    }
    return value[0].toUpperCase() + value.substr(1)
  }

}
