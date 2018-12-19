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

export default class{

  static install(Vue, option){
    for(const name in components){
      const component = components[name]
      applyOption(component, option)
      Vue.component(name, component)
    }
  }

}

export * from './components'
