export default class{

  static parseInt(string){
    if(!string){
      return null
    }
    string = string.normalize('NFKC')
    string = string.replace(/[^-\d\.]/g, '')
    const value = parseInt(string)
    if(isNaN(value)){
      return null
    }
    return value
  }

}
