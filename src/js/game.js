import config from './config.js'
import keyboard from './keyboard.js'

class Game {
  constructor (ctx, debug = false) {
    this.debug = debug ? this.debugOn : () => false
    this.lastUpdate = 0
    this.FPS = 0
    this.frames = 0
    this.acumDelta = 0
    this.deltaTime = 0

    this.canvas = ctx.canvas
    this.ctx = ctx

    this.distance = 120
    this.direction = 1
    this.x = 50
    this.y = 50

    this.lastKey = undefined
    this.pause = false

    this.run()
  }

  paint () {
    let { backgroundColor, player } = config.game
    let { ctx, canvas, x, y } = this
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = player.color
    ctx.fillRect(x, y, 10, 10)

    if (this.pause) {
      this.ctx.textAlign = 'center'
      this.ctx.fillText('PAUSE', 150, 75)
      this.ctx.textAlign = 'left'
    }
    return true
  }

  whoDirection () {
    let {KEY_LEFT, KEY_UP, KEY_DOWN, KEY_RIGHT, KEY_ENTER} = config.game.keyboard
    let dir = this.direction
    this.lastKey = keyboard.lastKeyPress()
    switch (this.lastKey) {
      case KEY_LEFT:
        dir = 3
        break
      case KEY_UP:
        dir = 0
        break
      case KEY_DOWN:
        dir = 2
        break
      case KEY_RIGHT:
        dir = 1
        break
      case KEY_ENTER:
        this.pause = !this.pause
        break
    }
    return dir
  }

  move () {
    let dir = this.whoDirection()
    let distance = this.distance * this.deltaTime
    if (this.pause) return true
    if (dir === 0) this.y -= distance
    if (dir === 1) this.x += distance
    if (dir === 2) this.y += distance
    if (dir === 3) this.x -= distance
    if (this.x > this.canvas.width) this.x = 0
    if (this.y > this.canvas.height) this.y = 0
    if (this.x < 0) this.x = this.canvas.width
    if (this.y < 0) this.y = this.canvas.height
    this.direction = dir
    return true
  }

  action () {
    this.move()
    return true
  }

  run () {
    window.requestAnimationFrame(this.run.bind(this))
    this.controlFrames()
    return !this.debug() && this.action() && this.paint()
  }

  controlFrames () {
    let now = Date.now()
    this.deltaTime = (now - this.lastUpdate) / 1000
    if (this.deltaTime > 1) this.deltaTime = 0
    this.lastUpdate = now
    this.frames++
    this.acumDelta += this.deltaTime
    if (this.acumDelta > 1) {
      this.FPS = this.frames
      this.frames = 0
      this.acumDelta -= 1
    }
  }

  debugOn () {
    console.log('FPS:', this.FPS)
    return false
  }
}

export default Game
