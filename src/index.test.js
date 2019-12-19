import Vue from 'vue'
import VueFields from './index'

describe('install', () => {

  const defaultComponents = Object.keys(Vue.options.components)

  it('without option', () => {
    Vue.use(VueFields)
    const names = Object.keys(Vue.options.components)
    expect(names).toContain('DateField')
    expect(names).toContain('IntegerField')
    expect(names).toContain('RepeatField')
    expect(names).toContain('NumberField')
    expect(names).toContain('PercentField')
    expect(names).toContain('RangeField')
    expect(names).toContain('SelectField')
    expect(names).toContain('TextField')
    expect(names).toContain('YearField')
  })

  it('prefix and suffix', () => {
    Vue.use(VueFields, {prefix: 'v', suffix: ''})
    const names = Object.keys(Vue.options.components)
    expect(names).toContain('VDate')
    expect(names).toContain('VInteger')
    expect(names).toContain('VRepeat')
    expect(names).toContain('VNumber')
    expect(names).toContain('VPercent')
    expect(names).toContain('VRange')
    expect(names).toContain('VSelect')
    expect(names).toContain('VText')
    expect(names).toContain('VYear')
  })

  afterEach(() => {
    Object.keys(Vue.options.components)
      .filter(it => defaultComponents.includes(it) === false)
      .forEach(it => delete Vue.options.components[it])

    if(Vue._installedPlugins != null){
      Vue._installedPlugins.length = 0
    }
  })

})
