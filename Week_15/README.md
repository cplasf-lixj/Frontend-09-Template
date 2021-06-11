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



## 手势的基础知识

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_15/gesture.png" style="zoom:100%;" />

1、start 后无其他操作，则认为是一次点击事件tap；

2、start后移动大于10px(Retina屏的值，一倍屏为5px，三倍屏为15px)后，则认为是缓慢移动事件pan；

3、如果pan结束的时候速度大于一定的值，则认为是清扫的事件，flick或swipe;

4、按下大于0.5s后，则是长按事件；

