import config from './config.js'
import keyboard from './keyboard.js'

class Game {
  constructor (ctx, debug = false) {
    if (debug) {
      this.lastUpdate = 0
      this.FPS = 0
      this.frames = 0
      this.acumDelta = 0
    }
    this.debug = debug ? this.debugOn : () => false
    this.canvas = ctx.canvas
    this.ctx = ctx

    this.distance = 4
    this.direction = 1
    this.x = 50
    this.y = 50

    this.lastKey = undefined
    this.pause = false

    this.run()
    this.paint()
  }

  paint () {
    window.requestAnimationFrame(this.paint.bind(this))
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
    if (this.pause) return true
    if (dir === 0) this.y -= this.distance
    if (dir === 1) this.x += this.distance
    if (dir === 2) this.y += this.distance
    if (dir === 3) this.x -= this.distance
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
    setTimeout(this.run.bind(this), 20)
    return !this.debug() && this.action()
  }

  debugOn () {
    let now = Date.now()
    let deltaTime = (now - this.lastUpdate) / 1000
    if (deltaTime > 1) deltaTime = 0
    this.lastUpdate = now
    this.frames++
    this.acumDelta += deltaTime
    if (this.acumDelta > 1) {
      this.FPS = this.frames
      this.frames = 0
      this.acumDelta -= 1
    }
    console.log('FPS:', this.FPS)
    return false
  }
}

export default Game
