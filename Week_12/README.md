学习笔记



# CSS排版

## 1. 盒(box)

### 盒模型

• margin

• border

• padding

• content

• box-sizing:

​	• content-box			width属性只包含content

​	• border-box			 width属性包含content、padding和border

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/box.png" style="zoom:35%;" />

## 2. 正常流

• 收集盒进行

• 计算盒在行中的排布

• 计算行的排布

### 2.1 行级排布

• Baseline	基线对齐

• Text 

​	• origin

​	• width

​	• height

​	• xMin, xMax

​	• yMin, yMax

​	• bearingX, bearingY

​	• advance

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/text.png" style="zoom:50%;" />

### 2.2 行模型

​	• line-top

​	• tex-top

​	• base-line

​	• text-bottom

​	• line-bottom

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/line.png" style="zoom:50%;" />

### 2.3 块级排布

#### float&Clear

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/float.png" alt="float" style="zoom:40%;" />

​	float:left会影响同行的元素的宽度

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/float2.png" alt="float2" style="zoom:40%;" />

​	float的影响范围的float元素的行高范围

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_12/float3.png" alt="float3" style="zoom:33%;" />

​	float 同向叠加，下一个元素的浮动的位置受上一个float的影响

​	使用clear强制换行

#### Margin Collapse 留白折叠现象

只在BFC中存在

### 2.4 BFC合并

• BFC：Block Formatting Content

• Block Container: 里面有BFC的

​	• 能容纳正常流的盒，里面就有BFC

• Block-level Box: 外面有BFC的

• Block Box = Block Container + Block-level Box

​	里外都有BFC

##### Block Container

​	• block

​	• inline-block

​	• table-cell

​	• flex item

​	• grid cell

​	• table-caption

##### Block-level Box

​	Block level																		Inline level

​	• display: block																• display: inline-block

​	• display: flex																   • display: inline-flex

​	• display: table																• display: inline-table

​	• display: grid																  • dispaly: inline-grid

​	• ......																				 • ......

​													display: run-in

##### 设立BFC

• floats

• absolutely positioned elements

• block containers( such as inline-blocks, table-cells, and table-captions ) that are not block boxes,

​	• flex items

​	• grid cell

​	• .....

• and block boxes with 'overflow' other than 'visible'

##### BFC 合并

• block box && overflow: visible

​	• BFC合并与float

​	• BFC合并与边距折叠

## 3. Flex排版

• 收集盒进行

• 计算盒在主轴方向的排布

• 计算盒在交叉轴方向的排布

## 4. 动画

### 4.1 Animation

• @keyframes定义

• animation: 使用

````css
@keyframes mykf
{
  from { background: red; }
  to {  background: yellow; }
}

div {
  animation: mykf 5s infinite;
}
````

• animation-name 时间曲线

• animation-duration	动画的时长；

• animation-timing-function	动画的时间曲线

• animation-delay	动画开始前的延迟

• animation-iteration-count	动画的播放次数

• animation-direction	动画的方向

### 4.2 Transition

• transition-property		要变换的属性

• transition-duration		变换的时长

• transition-timing-function	时间曲线

• transition-delay				延迟

## 5. 颜色

#### • CMYK

​	**印刷四色模式**-彩色印刷时采用的一种套色模式，利用色彩三原色混色原理，加上黑色油墨，共计四种颜色混合叠加，形成”全彩印刷”。

​	C: Cyan=青色，M:Magenta=品红色，Y:Yellow=黄色，K: Black=黑色

#### • HSL、HSV

​	• H: Hub=色相，S：Saturation=饱和度，L: Lightness=亮度，V：Value=明度

## 6. 绘制

• 几何图形

​	• border

​	• box-shadow

​	• border-radius

• 文字

​	• font

​	• text-decoration

• 位图

​	• background-image

 