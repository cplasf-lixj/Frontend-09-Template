const TICK = Symbol("tick")
const TICK_HANDLER = Symbol("tick-handler")
const ANIMATIONS = Symbol("animations")
const START_TIME_MAP = Symbol("start-time-map")
const START_TIME = Symbol("start-time")
const PAUSE_TIME = Symbol("pause-time")
const PAUSE_START = Symbol("pause-start")

export class Timeline {
  constructor() {
    this.state = "Inited"
    this[ANIMATIONS] = new Set()
    this[START_TIME_MAP] = new Map()
  }
  //  开始
  start() {
    if (this.state !== 'Inited')
      return

    this.state = "started"
    this[START_TIME] = Date.now()
    this[PAUSE_TIME] = 0
    this[TICK] = () => {
      let now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t
        if (this[START_TIME_MAP].get(animation) < this[START_TIME]) {
          t = now - this[START_TIME] - this[PAUSE_TIME] - animation.delay
        } else {
          t = now - this[START_TIME_MAP].get(animation) - this[PAUSE_TIME] - animation.delay
        }
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }
        if (t > 0) {
          animation.receive(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }
  // 暂停
  pause() {
    if (this.state !== 'started')
      return

    this.state = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  // 恢复
  resume() {
    if (this.state !== 'paused')
      return

    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }
  // 重置
  reset() {
    this.pause()
    this.state = "Inited"
    this[ANIMATIONS] = new Set()
    this[START_TIME_MAP] = new Map()
    this[START_TIME] = Date.now()
    this[PAUSE_START] = 0
    this[PAUSE_TIME] = 0
    this[TICK_HANDLER] = null
  }
  // 添加动画
  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATIONS].add(animation)
    this[START_TIME_MAP].set(animation, startTime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    timingFunction = timingFunction || (v => v)
    template = template || (v => v)

    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
    this.template = template
  }
  receive(time) {
    let range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(this.startValue + range * progress)

  }
}