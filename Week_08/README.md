学习笔记

# 浏览器工作原理



## 浏览器

​	http(url)-->parse(html)-->css computing(DOM)-->layout(Dom with CSS)-->render(Dom with position)-->Bitmap

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_08/1.png" alt="browser" style="zoom: 67%;" />

## 有限状态机

​	• 每个状态都是一个机器

​		• 在每一个机器里， 我们可以做计算、存储、输出

​		• 所有的这些状态接受的输入是一致的

​		• 状态机的每一个机器本身是没有状态，如果我们用函数来表示的话，它应该是纯函数(无副作用)

​	• 每一个机器知道下一个状态

​		• 每个机器都有确定的下一个状态(Moore)

​		• 每个机器根据输入决定下一个状态(Mealy)

### JS中有限状态机(Mealy)

````javascript
//每个函数是一个状态
function state(input) //函数参数都是输入
{
  //在函数中，可以自由的编写代码，处理每个状态的逻辑
  return next;	//返回值作为下一个状态
}

///////////以下是调用////////////
while(input) {
  //获取输入
  state = state(input)	//把状态机的返回值作为下一个状态
}
````

## HTTP的协议解析

### TCP与IP的一些基础知识

​	• 流

​	• 端口

​	• require('net')

​	• 包

​	• IP地址

​	• libnet/libpcap

### HTTP请求

	#### 第一步 HTTP请求

​	• 设计一个HTTP请求的类

​	• content type是讴歌必要的字段，要有默认值

​	• body是KV格式

​	• 不同的content-type影响body的格式

#### 第二步 Send函数

​	• 在Request的构造器中收集必要的信息

​	• 设计一个send函数，把请求真实发送到服务器

​	• send函数应该是异步的，所以返回Promise

#### 第三步 发送请求

​	• 设计支持已有的connection或者自己新建connection

​	• 收到数据传给parser

​	• 根据parser的状态resolve Promise

#### 第四步 response解析

​	• Response必须分段构造，要用ResponseParse来“装配”

​	• ResponseParse分段处理ResponseText，我们用状态机来分析文本的结构

#### 第五步 response body解析

​	• Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parse的结构来解决问题

