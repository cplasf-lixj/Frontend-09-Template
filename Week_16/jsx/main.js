import { Carousel } from "./carousel.js"
import { Component, createElement } from "./framework.js"
import { Button } from "./button.js"
import { List } from "./list.js"

let pics = [
  {
    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    url: "https://www.baidu.com",
    title: "Image1"
  },
  {
    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    url: "https://www.baidu.com",
    title: "Image2"
  },
  {
    img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    url: "https://www.baidu.com",
    title: "Image3"
  },
  {
    img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    url: "https://www.baidu.com",
    title: "Image4"
  },
]

// let aaa = <Carousel src={pics} onChange={event => console.log(event.detail.position)} onClick={event => console.log(event.detail.data)} />
// let aaa = <Button>会计法空间大烧烤架</Button>
let aaa = <List data={pics}>
  {(item) =>
    <div>
      <img src={item.img}></img>
      <a href={item.url}>{item.title}</a>
    </div>
  }

</List>
aaa.mountTo(document.body)