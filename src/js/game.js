import config from './config.js'
class Game {
  constructor (ctx, debug = false) {
    this.debug = debug ? this.debugOn : () => false
    this.lastUpdate = 0
    this.FPS = 0
    this.frames = 0
    this.acumDelta = 0
    this.canvas = ctx.canvas
    this.ctx = ctx
    this.x = 50
    this.y = 50
    this.run()
  }

  paint () {
    let { backgroundColor, player } = config.game
    let { ctx, canvas, x, y } = this
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = player.color
    ctx.fillRect(x, y, 10, 10)
    return true
  }

  action () {
    let { canvas } = this
    this.x = (this.x < canvas.width) ? (this.x + 2) : 0
    return true
  }

  run () {
    window.requestAnimationFrame(this.run.bind(this))
    return !this.debug() &&
      this.action() &&
      this.paint()
  }

  debugOn () {
    return false
  }
}

export default Game
