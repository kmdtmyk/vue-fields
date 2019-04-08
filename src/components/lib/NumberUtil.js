import Parser from './Parser'

export default class{

  static format(value){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }

    const [integer, decimal] = number.toString().split('.').map(it => parseInt(it))
    if(!decimal){
      return integer.toLocaleString()
    }

    return `${integer.toLocaleString()}.${decimal}`
  }

}

