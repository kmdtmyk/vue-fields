export default class{

  static getParents(element){
    const result = []
    let currentElement = element
    while(currentElement){
      result.push(currentElement)
      currentElement = currentElement.parentElement
    }
    result.push(document)
    return result
  }

  static getInputChildren(element){
    if(element.tagName === 'INPUT'){
      return [element]
    }
    return element.querySelectorAll('input')
  }

  static selectedAll(element){
    const start = element.selectionStart
    const end = element.selectionEnd
    const value = element.value
    return start === 0 && end === value.length
  }

}
