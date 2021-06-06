学习笔记

# 组件化基础



## 1 对象与组件

| 对象       | 组件         |
| ---------- | ------------ |
| Properties | Properties   |
| Methods    | Methods      |
| Inherit    | Inherit      |
|            | Attribute    |
|            | Config&State |
|            | Event        |
|            | LifeCycle    |
|            | Children     |

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_14/component.png" style="zoom:75%;" />

### 1.1 Attribute

#### 1.1.1 Attribute VS Property

• Attribute 强调描述性

• Property 强调从属关系

### 1.2 如何设计组件状态

|           | Markup set | JS set | JS Change | User Input Change |
| --------- | :--------: | :----: | :-------: | :---------------: |
| property  |     X      |   √    |     √     |         ?         |
| attribute |     √      |   √    |     √     |         ?         |
| state     |     X      |   X    |     X     |         √         |
| config    |     X      |   √    |     X     |         X         |

### 1.3 Lifecycle

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_14/lifecycle.png" style="zoom:80%;" />

### 1.4 Children

• Content型Children

• Template型Children

## 2. JSX环境搭建

• npm init 																						初始化工程

• npm install -g webpack webpack-cli 										全局安装webpack和webpack-cli

• npm install --save-dev webpack babel-loader 					   安装babel-loader

• npm install --save-dev @babel/core @babel/preset-env 	 安装babel依赖

• npm install --save-dev @babel/plugin-transform-react-jsx  支持jsx

• webpack.config.js

````js
module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        }
      }
    ]
  },
  mode: "development"
}
````

• 执行webpack

## 3. 鼠标事件坐标详解

### 3.1 clientX/Y

 `clientX/Y`获取到的是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变。
兼容性：所有浏览器均支持

### 3.2 pageX/Y

`pageX/Y`获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变
兼容性：除IE6/7/8不支持外，其余浏览器均支持

### 3.3 offsetX/Y

`offsetX/Y`获取到是触发点相对被触发dom的左上角距离，不过左上角基准点在不同浏览器中有区别，其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。

兼容性：IE所有版本，chrome，Safari均完美支持，Firefox不支持

### 3.4 layerX/Y

`layerX/Y`获取到的是触发点相对被触发dom左上角的距离，数值与offsetX/Y相同，这个变量就是firefox用来替代offsetX/Y的，基准点为边框左上角，但是有个条件就是，被触发的dom需要设置为position:relative或者position:absolute，否则会返回相对html文档区域左上角的距离。

兼容性：IE6/7/8不支持，opera不支持，IE9/10和Chrome、Safari均支持

### 3.5 screenX/Y

`screenX/Y`获取到的是触发点相对显示器屏幕左上角的距离，不随页面滚动而改变。
兼容性：所有浏览器均支持

![](https://segmentfault.com/img/bVXWPA?w=1043&h=552)

