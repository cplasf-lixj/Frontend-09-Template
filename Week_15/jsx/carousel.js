import { Component, createElement } from "./framework.js"

export class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
    this.timer = null
    this.currentIndex = 0
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  render() {
    this.root = document.createElement("div")
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${record}')`
      this.root.appendChild(child)
    }

    this.eventListener()

    this.autoPlay()

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }

  eventListener() {
    let width = 500;
    this.root.addEventListener("mousedown", (event) => {
      this.stopAutoPlay()
      let postion = this.currentIndex;
      let children = this.root.children
      let startX = event.clientX

      let move = event => {
        let moveX = event.clientX - startX

        let current = postion - ((moveX - moveX % width) / width)
        for (let offset of [-1, 0, 1]) {
          let pos = current + offset
          pos = (pos + children.length) % children.length

          let child = children[pos]
          child.style.transition = "none"
          child.style.transform = `translateX(${- pos * width + offset * width + moveX % width}px)`
        }
      }

      let up = event => {
        let moveX = event.clientX - startX
        postion = postion - Math.round(moveX / width)

        for (let offset of [0, Math.sign(moveX - width / 2 * Math.sign(moveX))]) {
          let pos = postion + offset
          pos = (pos + children.length) % children.length

          let child = children[pos]
          child.style.transition = ""
          child.style.transform = `translateX(${- pos * width + offset * width}px)`
        }
        this.currentIndex = postion
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
        this.autoPlay()
      }

      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })
  }

  autoPlay() {
    this.timer = setInterval(() => {
      this.play()
    }, 3000)
  }

  play() {
    let children = this.root.children;
    this.currentIndex = (this.currentIndex + children.length) % children.length
    let nextIndex = (this.currentIndex + 1) % children.length
    let current = children[this.currentIndex]
    let next = children[nextIndex]
    next.style.transition = "none"
    next.style.transform = `translateX(${100 - nextIndex * 100}%)`

    setTimeout(() => {
      current.style.transform = `translateX(${-100 * (this.currentIndex + 1)}%)`
      next.style.transition = ""
      next.style.transform = `translateX(${-nextIndex * 100}%)`
      this.currentIndex = nextIndex
    }, 16)
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}