import DateField from './DateField'
import IntegerField from './IntegerField'
import PercentageField from './PercentageField'

export {
  DateField,
  IntegerField,
  PercentageField,
}

export default class{

  static install(Vue, option){
    applyOption(DateField, option)
    applyOption(IntegerField, option)
    applyOption(PercentageField, option)
    Vue.component('DateField', DateField)
    Vue.component('IntegerField', IntegerField)
    Vue.component('PercentageField', PercentageField)
  }

}

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
  if(defaultClass && component.props.defaultClass){
    component.props.defaultClass.default = defaultClass
  }
}

