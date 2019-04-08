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
      const {integer, decimal} = split(round(number, precision))
      if(decimal == null){
        return integer.toLocaleString()
      }
      return `${integer.toLocaleString()}.${decimal}`
    }

    return `${integer.toLocaleString()}.${decimal}`
  }

}

const split = (number) => {
  const [integer, decimal] = number.toString()
    .split('.')
    .map(it => it ? parseInt(it) : it)
  return {integer, decimal}
}

const round = (number, precision) => {
  return parseFloat(number.toFixed(precision))
}
