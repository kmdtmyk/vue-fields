
// 123.5
// => {integer: 123, decimal: 0.5}
export default (number) => {
  const splitedNumber = number.toString().split('.')
  const integer = Number(splitedNumber[0] ?? 0)
  const decimal = splitedNumber[1] != null ? Number(`0.${splitedNumber[1] ?? 0}`) : null
  return {integer, decimal}
}
