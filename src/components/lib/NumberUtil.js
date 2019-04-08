import Parser from './Parser'

export default class{

  static format(value, options = {}){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }

    const {integer, decimal} = split(number)
    if(!decimal){
      return integer.toLocaleString()
    }

    const {precision} = options
    if(precision != null){
      const {integer, decimal} = split(this.round(number, precision))
      if(decimal == null){
        return integer.toLocaleString()
      }
      return `${integer.toLocaleString()}.${decimal}`
    }

    return `${integer.toLocaleString()}.${decimal}`
  }

  static round(value, precision){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }
    return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
  }

}

const split = (number) => {
  const [integer, decimal] = number.toString()
    .split('.')
    .map(it => it ? parseInt(it) : it)
  return {integer, decimal}
}

