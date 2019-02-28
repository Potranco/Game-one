import config from './config.js'
import keyboard from './keyboard.js'
import Rectangle from './Rectangle.js'
import gamepad from './gamepad.js'

console.log('gamepad', gamepad)

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

    this.player = new Rectangle(40, 40, 10, 10, config.game.player.color)
    this.food = new Rectangle(80, 80, 10, 10, config.game.food.color)
    this.colums = []
    this.colums[0] = new Rectangle()

    this.lastKey = undefined
    this.pause = false
    this.score = 0

    this.run()
  }

  random (max) {
    return Math.floor(Math.random() * max)
  }

  paint () {
    let { backgroundColor } = config.game
    let { ctx, canvas, player, food } = this
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = player.color
    player.fill(ctx)

    ctx.fillStyle = food.color
    food.fill(ctx)

    ctx.fillStyle = '#fff'
    ctx.fillText('Score: ' + this.score, 0, 10)

    if (this.pause) {
      this.ctx.textAlign = 'center'
      this.ctx.fillText('PAUSE', 150, 75)
      this.ctx.textAlign = 'left'
    }
    return true
  }

  whatDirection () {
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
    let {player} = this
    let dir = this.whatDirection()
    let distance = this.distance * this.deltaTime
    if (this.pause) return true
    if (dir === 0) player.y -= distance
    if (dir === 1) player.x += distance
    if (dir === 2) player.y += distance
    if (dir === 3) player.x -= distance
    if (player.x > this.canvas.width) player.x = 0
    if (player.y > this.canvas.height) player.y = 0
    if (player.x < 0) player.x = this.canvas.width
    if (player.y < 0) player.y = this.canvas.height
    this.direction = dir
    return true
  }

  action () {
    let {player, food, canvas} = this
    this.move()
    if (player.intersects(food)) {
      this.score++
      food.x = this.random(canvas.width / 10 - 1) * 10
      food.y = this.random(canvas.height / 10 - 1) * 10
    }
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
