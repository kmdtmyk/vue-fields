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
  const {inputClass} = option
  const {props} = component
  if(inputClass && props.inputClass){
    if(Array.isArray(props.inputClass)){
      props.inputClass = {
        type: props.inputClass
      }
    }
    props.inputClass.default = inputClass
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
      Vue.component(mountName, component)
    }
  }

}

export * from './components'
