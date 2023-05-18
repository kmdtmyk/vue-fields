import split from './split'

test('split', () => {
  expect(split(123)).toEqual({integer: 123, decimal: null})
  expect(split(0.123)).toEqual({integer: 0, decimal: 0.123})
  expect(split(.456)).toEqual({integer: 0, decimal: 0.456})
  expect(split(123.456)).toEqual({integer: 123, decimal: 0.456})
  expect(split(.000123)).toEqual({integer: 0, decimal: 0.000123})
  expect(split(0)).toEqual({integer: 0, decimal: null})
})

