import { Component, STATE, ATTRIBUTE } from "./framework.js"
import { enableGesture } from "./gesture.js"
import { Timeline, Animation } from "./animation.js"
import { ease } from "./ease.js"

export { STATE, ATTRIBUTE } from "./framework.js"

export class Carousel extends Component {
  constructor() {
    super()
    this.handler = null
    this[STATE].currentIndex = 0
    this.width = 500;
    this.timeline = new Timeline;
    this.animationStartTime = 0
    this.animationDuration = 500
  }

  setAttribute(name, value) {
    if (name === 'src') {
      value = value.map(item => {
        if (typeof item === 'string') {
          return { img: item, url: item }
        }
        return item
      })
    }
    super.setAttribute(name, value)
  }

  render() {
    this.root = document.createElement("div")
    this.root.classList.add('carousel')
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }
    enableGesture(this.root)
    this.timeline.start();

    this.eventListenerNew()

    this.autoPlay()

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
  eventListenerNew() {
    let children = this.root.children
    let ax = 0
    this.root.addEventListener('start', event => {
      this.stopAutoPlay()
      if (Date.now() - this.animationStartTime < this.animationDuration) {
        let progress = (Date.now() - this.animationStartTime) / this.animationDuration
        ax = ease(progress) * this.width - this.width
      } else {
        ax = 0
      }
    })
    this.root.addEventListener('tap', event => {
      this.triggerEvent("click", {
        data: this[ATTRIBUTE].src[this[STATE].currentIndex].url,
        position: this[STATE].currentIndex
      })
    })

    this.root.addEventListener('pan', event => {
      let moveX = event.clientX - event.startX - ax
      let current = this[STATE].currentIndex - ((moveX - moveX % this.width) / this.width)
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length

        let child = children[pos]
        child.style.transition = "none"
        child.style.transform = `translateX(${- pos * this.width + offset * this.width + moveX % this.width}px)`
      }
    })
    this.root.addEventListener('end', event => {
      this.timeline.reset()
      this.timeline.start()

      let moveX = event.clientX - event.startX - ax
      let current = this[STATE].currentIndex - ((moveX - moveX % this.width) / this.width)

      let direction = Math.round((moveX % this.width) / this.width)

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((moveX % this.width) / this.width)
        } else {
          direction = Math.floor((moveX % this.width) / this.width)
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length

        let child = children[pos]
        child.style.transition = "none"
        this.timeline.add(new Animation(child.style, 'transform',
          - pos * this.width + offset * this.width + moveX % this.width,
          - pos * this.width + offset * this.width + direction % this.width,
          this.animationDuration, 0, ease, v => `translateX(${v}px)`))
      }

      this[STATE].currentIndex = this[STATE].currentIndex - ((moveX - moveX % this.width) / this.width) - direction
      this[STATE].currentIndex = (this[STATE].currentIndex % children.length + children.length) % children.length
      this.triggerEvent("change", { position: this[STATE].currentIndex })
      this.autoPlay()
    })
  }

  play() {
    let children = this.root.children;
    let nextIndex = (this[STATE].currentIndex + 1) % children.length

    let current = children[this[STATE].currentIndex]
    let next = children[nextIndex]

    this.animationStartTime = Date.now()

    this.timeline.add(new Animation(current.style, 'transform', - this[STATE].currentIndex * this.width, - this.width - this[STATE].currentIndex * this.width, this.animationDuration, 0, ease, v => `translateX(${v}px)`))
    this.timeline.add(new Animation(next.style, 'transform', this.width - nextIndex * this.width, - nextIndex * this.width, this.animationDuration, 0, ease, v => `translateX(${v}px)`))
    this[STATE].currentIndex = nextIndex
    this.triggerEvent("change", { position: this[STATE].currentIndex })
  }

  autoPlay() {
    this.handler = setInterval(() => {
      this.play()
    }, 3000)
  }

  stopAutoPlay() {
    this.timeline.pause()
    clearInterval(this.handler)
  }
}