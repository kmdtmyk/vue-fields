import Elements from '../lib/Elements'

export default {
  data(){
    return {
      dropdownOpen: false,
      dropdownRecords: [],
      dropdownStyle: {},
    }
  },
  watch: {
    dropdownOpen(){
      let elements = Elements.getParents(this.$el)
      if(this.dropdownOpen){
        this.updateDropdownStyle()
        elements.forEach(element => {
          element.addEventListener('scroll', this.onParentScroll)
        })
        window.addEventListener('resize', this.onWindowResize)
      }else{
        elements.forEach(element => {
          element.removeEventListener('scroll', this.onParentScroll)
        })
        window.removeEventListener('resize', this.onWindowResize)
      }
    },
  },
  methods: {
    mousedown(e){
      this.dropdownOpen = true
    },
    focus(e){
      this.dropdownOpen = true
    },
    blur(e){
      this.dropdownOpen = false
    },
    keydownUp(e){
      this.dropdownOpen = true
      this.$nextTick(() => {
        this.$refs.dropdown.up()
      })
    },
    keydownDown(e){
      if(!this.dropdownOpen){
        this.dropdownOpen = true
      }else{
        this.$refs.dropdown.down()
      }
    },
    keydownEnter(e){
      if(this.$refs.dropdown && 0 < this.$refs.dropdown.$children.length){
        e.preventDefault()
        this.$refs.dropdown.select()
        this.dropdownOpen = false
      }
    },
    keydownEscape(e){
      this.dropdownOpen = false
    },
    onParentScroll(e){
      this.dropdownOpen = false
    },
    onWindowResize(e){
      this.dropdownOpen = false
    },
    updateDropdownStyle(){
      const input = this.$refs.input[0] || this.$refs.input
      if(!input){
        return
      }
      const {fontSize} = window.getComputedStyle(input)
      const rect = input.getBoundingClientRect()
      const left = `${rect.x}px`
      const top = `${rect.height + rect.y}px`
      const width = `${rect.width}px`
      this.dropdownStyle = {fontSize, width, left, top}
    },
  }
}
