import config from './config.js'

class App {
  constructor (idCanvas) {
    let {id, context} = config.canvas
    this.canvasId = idCanvas || id
    this.canvas = document.getElementById(this.canvasId) ? document.getElementById(this.canvasId) : this.createCanvas()
    this.ctx = this.canvas.getContext(context)
    this.paint()
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

  paint () {
    let { ctx } = this
    ctx.fillStyle = '#0f0'
    ctx.fillRect(50, 50, 100, 60)
  }
}

window.app = new App()
