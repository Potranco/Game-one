import config from './config.js'
import Game from './game.js'

class App {
  constructor (idCanvas) {
    let {id, context} = config.canvas
    this.canvasId = idCanvas || id
    this.canvas = document.getElementById(this.canvasId) ? document.getElementById(this.canvasId) : this.createCanvas()
    this.ctx = this.canvas.getContext(context)
    this.game = new Game(this.ctx)
    this.game.paint()
  }

  createCanvas () {
    let {id, width, height} = config.canvas
    let element = document.createElement('canvas')
    element.setAttribute('id', id)
    element.setAttribute('width', width)
    element.setAttribute('height', height)
    element.innerHTML = 'Canvas not supported'
    return document.body.appendChild(element)
  }
}

window.app = new App()
