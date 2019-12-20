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

}
