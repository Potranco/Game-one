
export default class Rectangle {
  constructor (x = 0, y = 0, width = 0, height = 0, color = null) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height || this.width
    this.color = color
  }

  intersects (obj = {x: 0, y: 0, width: 0, hegiht: 0}) {
    let {x, y, width, height} = this
    return (x < obj.x + obj.width &&
      x + width > obj.x &&
      y < obj.y + obj.height &&
      y + height > obj.y)
  }

  fill (ctx = null) {
    let {x, y, width, height} = this
    return ctx !== null && ctx.fillRect(x, y, width, height)
  }
}
