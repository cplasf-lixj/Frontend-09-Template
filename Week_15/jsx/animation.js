const TICK = Symbol("tick")
const TICK_HANDLER = Symbol("tick-handler")
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol("start-time")

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }
  //  开始
  start() {
    let startTime = Date.now()
    this[TICK] = () => {
      let now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime
        } else {
          t = now - this[START_TIME].get(animation)
        }
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }
        animation.receive(t)
      }
      requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }
  // 暂停
  pause() {

  }
  // 恢复
  resume() {

  }
  // 重置
  reset() {

  }
  // 添加动画
  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }
  receive(time) {
    let range = this.endValue - this.startValue
    this.object[this.property] = this.startValue + range * time / this.duration

  }
}