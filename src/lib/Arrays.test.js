import Arrays from './Arrays'

describe('from', () => {

  it('array', () => {
    expect(Arrays.from([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('function', () => {
    expect(Arrays.from(() => [1, 2, 3])).toEqual([1, 2, 3])
  })

})

describe('search', () => {

  it('ignore case', () => {
    const array = [
      'foo',
      'bar',
      'hoge',
    ]
    expect(Arrays.search(array, 'foo')).toEqual(['foo'])
    expect(Arrays.search(array, 'FOO')).toEqual(['foo'])
  })

  it('multiple words', () => {
    const array = [
      'ubuntu',
      'centos',
      'debian',
      'linux mint',
    ]
    expect(Arrays.search(array, 'li mi')).toEqual(['linux mint'])
    expect(Arrays.search(array, 'li　mi')).toEqual(['linux mint'])
  })

})
