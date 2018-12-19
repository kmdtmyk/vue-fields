export default class{

  static search(array, query){
    return array.filter(value => {
      return value.toString().toLowerCase().includes(query.toLowerCase())
    })
  }

}
