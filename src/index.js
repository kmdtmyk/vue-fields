import * as components from './components'

function extractProps(component){
  const {props} = component
  if(!Array.isArray(props)){
    return
  }
  const newProps = {}
  props.forEach(prop => newProps[prop] = {})
  component.props = newProps
}

function applyOption(component, option){
  option = option || {}
  extractProps(component)
  const {defaultClass} = option
  const {props} = component
  if(defaultClass && props.defaultClass){
    if(Array.isArray(props.defaultClass)){
      props.defaultClass = {
        type: props.defaultClass
      }
    }
    props.defaultClass.default = defaultClass
  }
}

function transformName(originalName, prefix = '', suffix = 'Field'){
  const names = []
  names.push(prefix)
  names.push(originalName.replace('Field', ''))
  names.push(suffix)
  return names.map(name => upcaseFirstChar(name)).join('')
}

function upcaseFirstChar(string){
  if(!string){
    return string
  }
  return string[0].toUpperCase() + string.substr(1)
}

export default class{

  static install(Vue, option){
    const {prefix, suffix} = option
    for(const name in components){
      const component = components[name]
      applyOption(component, option)
      const mountName = transformName(name, prefix, suffix)
      console.log(mountName)
      Vue.component(mountName, component)
    }
  }

}

export * from './components'
