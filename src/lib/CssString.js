export default class{

  static parse(text){
    const result = {}

    text.split(';').forEach(rule => {
      const index = rule.indexOf(':')
      if(index === -1){
        return
      }
      const name = rule.substring(0, index)
      const value = rule.substring(index + 1)
      result[name.trim()] = value.trim()
    })

    return result
  }

}
