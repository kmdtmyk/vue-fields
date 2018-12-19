export default class{

  static search(array, query){
    if(!query){
      return array
    }
    return array.filter(value => {
      return value.toString().toLowerCase().includes(query.toLowerCase())
    })
  }

}
