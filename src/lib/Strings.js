export default class{

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
