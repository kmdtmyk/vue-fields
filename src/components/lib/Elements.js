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

}
