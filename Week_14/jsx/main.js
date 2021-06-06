import { Component, createElement } from "./framework.js"

class Carousel extends Component {
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
        console.log('moveX      ', moveX, Math.sign(moveX - width / 2 * Math.sign(moveX)))
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

let pics = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]

let aaa = <Carousel src={pics} />

aaa.mountTo(document.body)