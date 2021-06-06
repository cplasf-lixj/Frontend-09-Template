学习笔记



## JavaScript处理帧的三种方案

### 1. setInterval

````js
setInterval(() => {}, 16)
````

人眼能够识别的最高帧率是60帧，每一帧的时间是1000毫秒/60 ≈ 16.6ms

### 2. setTimeout

````js
let tick = () => {
  setTimeout(tick, 16)
}
````

### 3.requestAnimationFrame

````js
let tick = () => {
  requestAnimationFrame(tick)
}
````

在浏览器执行下一帧的时候执行动画代码

推荐使用requestAnimationFrame，不推荐使用setInterval，按照setInterval未必会按照16毫秒执行，同时可能会造成任务挤压。

使用requestAnimationFrame可以使用cancelAnimationFrame取消动画。

````js
let tict = () => {
  let handler = requestAnimationFrame(tick)
  cancelAnimationFrame(handler)
}
````

