const eventNames = {
  connected: 'gamepadconnected',
  disconnected: 'gamepaddisconnected'
}

class GamePad {
  constructor () {
    this.enable = !!(navigator.getGamepads || navigator.webkitGetGamepads)
    this.gamepads = navigator.getGamepads() || navigator.webkitGetGamepads
    if (this.enable) {
      this.addEvent(eventNames.connected, this._refreshGamepads.bind(this))
      this.addEvent(eventNames.disconnected, this._refreshGamepads.bind(this))
    } else {
      console.info('Gamepad controls not supported')
    }
  }

  addEvent (eventName, callBack) {
    return this.enable && window.addEventListener(eventName, callBack)
  }

  _refreshGamepads (event) {
    this.gamepads = navigator.getGamepads() || navigator.webkitGetGamepads
  }
}

export default new GamePad()
