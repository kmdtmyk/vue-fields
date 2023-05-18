import Parser from './Parser'
import split from './number/split'

export default class{

  static clamp(value, min, max){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }
    let result = number

    if(min != null && result < min){
      result = min
    }

    if(max != null && max < result){
      result = max
    }

    return result
  }

  static format(value, options = {}){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }

    const {precision, delimiter = true} = options

    if(precision != null){
      const {integer, decimal} = split(this.round(number, precision))
      return join(integer, decimal, delimiter)
    }

    const {integer, decimal} = split(number)
    return join(integer, decimal, delimiter)
  }

  static round(value, precision){
    const number = Parser.parseFloat(value)
    if(number == null){
      return null
    }
    if(precision == null){
      return number
    }
    return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
  }

}

const join = (integer, decimal, delimiter) => {
  const integerString = delimiter === true ? integer.toLocaleString() : integer.toString()
  if(decimal == null){
    return integerString
  }
  return `${integerString}.${decimal.toString().split('.')[1]}`
}
