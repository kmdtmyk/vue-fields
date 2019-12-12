export default class{

  static search(array, query){
    if(!query){
      return array
    }
    return array.filter(value => {
      return value.toString().toLowerCase().includes(query.toLowerCase())
    })
  }

  static from(arrayLike){
    if(Array.isArray(arrayLike)){
      return arrayLike
    }

    if(arrayLike instanceof Function){
      return this.from(arrayLike())
    }

    return []
  }

}
