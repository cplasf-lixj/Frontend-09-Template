export class Dispatcher {
  constructor(element) {
    this.element = element
  }

  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}

export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false
    let contextMap = new Map()
    /**********鼠标事件监听*********/
    element.addEventListener("mousedown", event => {
      let context = Object.create(null)
      contextMap.set("mouse" + (1 << event.button), context)
      recognizer.start(event, context)
      let mousemove = event => {
        let button = 1;
        while (button <= event.buttons) {
          if (button & event.buttons) {
            let key;
            if (button === 2) {
              key = 4
            } else if (button === 4) {
              key = 2
            } else {
              key = button
            }
            let context = contextMap.get('mouse' + key)
            recognizer.move(event, context)
            button = button << 1
          }
        }
      }
      let mouseup = event => {
        let context = contextMap.get('mouse' + (1 << event.button))
        recognizer.end(event, context)
        contextMap.delete('mouse' + (1 << event.button))

        // 移除监听事件
        if (event.buttons === 0) {
          // 无鼠标事件时
          document.removeEventListener("mousemove", mousemove)
          document.removeEventListener("mouseup", mouseup)
          isListeningMouse = false
        }
      }

      // 注册监听事件
      if (!isListeningMouse) {
        isListeningMouse = true
        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
      }
    })

    /**********投屏事件监听*********/
    element.addEventListener("touchstart", event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contextMap.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })
    element.addEventListener("touchmove", event => {
      for (let touch of event.changedTouches) {
        let context = contextMap.get(touch.identifier)
        recognizer.move(touch, context)
      }
    })
    element.addEventListener("touchend", event => {
      for (let touch of event.changedTouches) {
        let context = contextMap.get(touch.identifier)
        recognizer.end(touch, context)
        contextMap.delete(touch.identifier)
      }
    })
    element.addEventListener("touchcancel", event => {
      for (let touch of event.changedTouches) {
        let context = contextMap.get(touch.identifier)
        recognizer.cancel(touch, context)
        contextMap.delete(touch.identifier)
      }
    })

  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }

  start = (point, context) => {
    context.startX = point.clientX, context.startY = point.clientY
    this.dispatcher.dispatch("start", {
      clientX: point.clientX,
      clientY: point.clientY,
    })

    context.isTap = true
    context.isPress = false
    context.isPan = false
    // 存在鼠标或触摸点数，用于计算速度
    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
      }
    ]

    context.handler = setTimeout(() => {
      context.isTap = false
      context.isPress = true
      context.isPan = false
      context.handler = null
      this.dispatcher.dispatch("press", {})
    }, 500)
  }

  move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      // 移动距离大于10px
      context.isTap = false
      context.isPress = false
      context.isPan = true
      context.direction = Math.abs(dx) < Math.abs(dy) ? "vert" : "hori"
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        direction: context.direction
      })
      clearTimeout(context.handler)
    }

    if (context.isPan) {
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        direction: context.direction
      })
    }

    // 过滤一段时间内的点
    context.points = context.points.filter(point => {
      return Date.now() - point.t < 500
    })
    // 添加最新的点
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }

  end = (point, context) => {
    if (context.isTap) {
      this.dispatcher.dispatch("tap", {})
      clearTimeout(context.handler)
    }
    if (context.isPress) {
      this.dispatcher.dispatch("pressend", {

      })
    }

    // 计算速度
    let v = 0
    if (context.points.length) {
      let d = (point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2
      d = Math.sqrt(d)
      v = d / (Date.now() - context.points[0].t)
    }

    if (v > 1.2) {
      context.isFlick = true
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        direction: context.direction,
        isFlick: context.isFlick,
        velocity: v,
      })
    } else {
      context.isFlick = false
    }
    if (context.isPan) {
      this.dispatcher.dispatch("panend", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        direction: context.direction,
        isFlick: context.isFlick,
        velocity: v,
      })
    }
    this.dispatcher.dispatch("end", {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      direction: context.direction,
      isFlick: context.isFlick
    })
  }

  cancel = (point, context) => {
    clearTimeout(context.handler)
    this.dispatcher.dispatch("cancel", {})
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}