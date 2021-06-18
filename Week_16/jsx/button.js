import { Component, createElement, STATE, ATTRIBUTE } from "./framework.js"
export { STATE, ATTRIBUTE } from "./framework.js"


export class Button extends Component {
  constructor() {
    super()

  }

  render() {
    this.childContainer = <span />
    this.root = (<div>{this.childContainer}</div>).root
  }

  appendChild(child) {
    if (!this.childContainer) {
      this.render()
    }
    this.childContainer.appendChild(child)
  }
}