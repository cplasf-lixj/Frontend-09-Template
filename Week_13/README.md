学习笔记

# 1.重新HTML

[DTD](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)

[XML namespace](http://www.w3.org/1999/xhtml)

## 1.1合法元素

• Element: <tagname>...<tagname>

• Text: text

• Comment: <!-- comments -->

• DocumentType: <!Doctype html>

• ProcessingInstruction: <?a 1?>

• CDATA:<![CDATA[]]>

## 1.2 字符引用

• `&#161;` &#161;

• `&amp;` &amp;

• `&lt;` &lt;

• `&quot;`  &quot;



# 2. 重新DOM

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_13/node.png" style="zoom:50%;" />

## 2.1 导航类操作

| Node            | Element                |
| :-------------- | :--------------------- |
| paramentNode    | paramentElement        |
| childNodes      | children               |
| firstChild      | firstElementChild      |
| lastChild       | lastElementChild       |
| nextSibling     | nextElementSibling     |
| previousSibling | previousElementSibling |

## 2.2 修改操作

• appendChild		

• insertBefore

• removeChild

• replaceChild

## 2.3 高级操作

• compareDocumentsPosition	比较两个节点关系的函数

• contains	检查一个节点是否包含另一个节点

• isEqualNode	检查两个节点是否完全相同

• isSameNode 	检查两个节点是否是同一个节点，JavaScript中可以用“===”

• cloneNode		复制一个节点，传入参数true，可以深拷贝。

## 2.4 Event: 冒泡与捕获

target.addEventListener(type, listener, [, options])

target.addEventListener(type, listener, [, useCapture])

options

​	capture: 冒泡模式还是捕获模式

​		**冒泡和捕获是浏览器处理事件的机制，于监听与否无关。**

​		任何事件都是先捕获、再冒泡，从外向内计算事件发生在哪个元素的过程称为捕获，而冒泡就是找到元素后层层向外触发响应的过程。

​	once: 是否只响应一次

​	passive: 是否是不会产生副作用的事件



# 3. Range API

## 3.1 Range 创建

• var range = new Range()

• range.setStart(element, 9)

• range.setEnd(eleent, 4)

## 3.2 根据Selection创建Range

• var range = document.getSelection().getRangeAt(0)

## 3.3 其他API

• range.setStartBefore

• range.setEndBefore

• range.setStartAfter

• range.setEndAfter

• range.selectNode

• range.selectNodeContents

## 3.4 Range的操作

• var fragement = range.extractContents()						//提取内容

• range.insertNode(document.createTextNode("aaa"))  //插入节点



# 4. CSSOM

## 4.1 document.styleSheets

​	获取css样式

## 4.2 Rules

• documents.styleSheets[0].cssRules

• documents.styleSheets[0].insertRule("p{ color: red; }", 0)

• documents.styleSheets[0].removeRule(0)

## 4.3 Rule

• CSSStyleRule

​	• selectorText  String

​	• style	K-V结构

• CSSCharsetRule

• CSSImportRule

• CSSMediaRule

• CSSFontFaceRule

• CSSPageRule

• CSSNamespaceRule

• CSSKeyframesRule

• CSSKeyframeRule

• CSSSuportsRule

## 4.4 getComputedStyle

• window.getComputedStyle(elt, pseudoElt);

​	• elt 想要获取的元素

​	• pseudoEle 可选，伪元素



# 5. CSSOM View

## 5.1 window

• **window.innerWidth, window.innerHeight**

• window.outerWidth, windowHeight

• window.devicePixelRatio

• window.screen

​	• window.screen.width

​	• window.screen.height

​	• window.screen.availWidth

​	• window.screen.availHeight

## 5.2 Window API

• window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )

• moveTo(x, y)

• moveBy(x, y)

• resizeTo(x, y)

• resizeBy(x, y)

## 5.3 scorll

• scrollTop

• scrollLeft

• scrollWidth

• scrollHeight

• scroll(x, y)

• scrollBy(x, y)

• scrollIntoView()

	### 5.3.1 window scroll

• scrollX

• scrollY

• scroll(x, y)

• scrollBy(x, y)

## 5.4 layout

• getClientRects()

• getBoundingClientRect()

## 5.5 标准化组织

• khronos • WebGL

• ECMA

​	• ECMAScript

• WHATWG 

​	• HTML

• W3C

​	• webaudio

​	• CG/WG