
class Keyboard {
  constructor () {
    this.lastKey = null
    document.addEventListener('keydown', this.onkeydown.bind(this))
    document.addEventListener('keyup', this.onkeyup.bind(this))
  }

  onkeydown (event) {
    this.lastKey = event.which
  }

  onkeyup (event) {

  }

  lastKeyPress () {
    let key = this.lastKey
    this.lastKey = null
    return key
  }
}

export default new Keyboard()
