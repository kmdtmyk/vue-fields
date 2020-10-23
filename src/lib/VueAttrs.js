export default class{

  static readonly(attrs){
    if(attrs.hasOwnProperty('readonly') === false){
      return false
    }

    const value = attrs.readonly

    if(value == null || value === false){
      return false
    }

    return true
  }

}
