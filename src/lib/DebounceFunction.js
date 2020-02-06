export default class{

  constructor(func){
    this.func = func
    this.timeoutID = null
  }

  call(option){

    const {wait} = option

    if(this.timeoutID != null){
      this.cancel()
    }

    if(wait <= 0){
      this.func(...option.arguments)
    }else{
      this.timeoutID = setTimeout(() => {
        this.timeoutID = null
        this.func(...option.arguments)
      }, wait)
    }

  }

  cancel(){
    clearTimeout(this.timeoutID)
    this.timeoutID = null
  }

}
