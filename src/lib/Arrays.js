import Strings from './Strings'

export default class{

  static from(arrayLike){
    if(Array.isArray(arrayLike)){
      return arrayLike
    }

    if(arrayLike instanceof Function){
      return this.from(arrayLike())
    }

    return []
  }

  static isNullOrEmpty(array){
    if(array == null){
      return true
    }
    return array.length === 0
  }

  static search(array, query){
    if(Strings.isEmpty(query)){
      return array
    }
    const words = query.split(/\s/)
    return array.filter(value => {
      return words.every(word => {
        return value.toString().toLowerCase().includes(word.toLowerCase())
      })
    })

  }

}
