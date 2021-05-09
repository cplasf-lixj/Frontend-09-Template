学习笔记

# CSS总体架构

## At-Rules

• @charset: https://www.w3.org/TR/css-syntax-3/

• @import: https://www.w3.org/TR/css-cascade-4/

• **@media: https://www.w3.org/TR/css3-conditional/**

• @page: https://www.w3.org/TR/css-page-3/

• @counter-style: https://www.w3.org/TR/css-counter-styles-3

• **@keyframes ：https://www.w3.org/TR/css-animations-1/**

• **@fontface ：https://www.w3.org/TR/css-fonts-3/**

• @supports ：https://www.w3.org/TR/css3-conditional/

• @namespace ：https://www.w3.org/TR/css-namespaces-3/

## Rule CSS规则

• 选择器

​	• https://www.w3.org/TR/selectors-3/

​		• 选择器组 selector_group

​		• 选择器 selector

​			• > 

​			• <sp>

​			• +

​			• ~

​		• 简单选择器 simple_selector

​			• type 类型选择器

​			• * 

​			• . id选择器

​			• # 类选择器

​			• [] 属性

​			• : 伪类

​			• :: 伪元素

​			• :not() 

​	• https://www.w3.org/TR/selectors-4/

• 声明

​	• Key

​		• Properties

​		• Variables: https://www.w3.org/TR/css-variables/

​	• Value

​		• https://www.w3.org/TR/css-values-4/



# 选择器语法

## 简单选择器

​	• *							通用选择器

​	• div svg|a			 类型选择器

​	• .cls						类选择

​	• #id						ID选择器

​	• [attr=value]		 属性选择器

​	• :hover				  伪类选择器

​	• ::before				伪元素选择器

## 复合选择器

​	• <简单选择器> <简单选择器> <简单选择器>

​	• * 或者 div 必须写在最前面

## 复杂选择器

​	• <复合选择器> <sp> <复合选择器>			//子孙选择器

​	• <复合选择器> ">" <复合选择器>				// 父子选择器

​	• <复合选择器> "~" <复合选择器>				// 联结选择器，不必紧挨着

​	• <复合选择器> "+" <复合选择器>				// 联结选择器，必须紧挨着

​	• <复合选择器> "||" <复合选择器>			 // 表格选择某列

# 选择器优先级

## 简单选择器计数

引用：[优先级的计算](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#specificity_2)

The amount of specificity a selector has is measured using four different values (or components), which can be thought of as thousands, hundreds, tens, and ones — four single digits in four columns:

1. **Thousands**: Score one in this column if the declaration is inside a [`style`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-style) attribute, aka inline styles. Such declarations don't have selectors, so their specificity is always 1000.
2. **Hundreds**: Score one in this column for each ID selector contained inside the overall selector.
3. **Tens**: Score one in this column for each class selector, attribute selector, or pseudo-class contained inside the overall selector.
4. **Ones**: Score one in this column for each element selector or pseudo-element contained inside the overall selector.

````css
#id div.a#id {
  // ....
}
````

这个css的优先级为[0, 2, 1, 1]

S = 0 * N³ + 2 * N² + 1 * N¹ + 1 * Nº

假设取N=1000000，则S=2000001000001

# 伪类

## 链接/行为

​	• :any-link	所有超链接

​	• :link :visited

​	• :hover 			鼠标移上去

​	• :active			 激活状态

​	• :focus			  获取焦点

​	• :target	         链接到当前目标

## 树结构

​	• :empty

​	• :nth-child()          //从1开始

​	• :nth-last-child()

​	• :first-child :last-child :only-child

## 逻辑型

​	• :not伪类

​	• :where :has

# 伪元素

​	• ::before

​	• ::after

​	• ::first-line

​		• font系列

​		• color系列

​		• background系列

​		• word-spacing

​		• letter-spacing

​		• text-decoration

​		• text-transform

​		• line-height

​	• ::first-letter

​		• font系列

​		• color系列

​		• background系列

​		• word-spacing

​		• letter-spacing

​		• text-decoration

​		• text-transform

​		• line-height

​		• float

​		• vertical-align

​		• 盒模型系列：margin, padding, border



## 思考题：

- 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

  因为 float 会让元素脱离文档流，然后文档流内的内容会选出新的第一行，这个新的第一行又会被 ::first-line 选中，然后 float 使其脱离文档流。最后会一直循环下去，知道文档流没有文字。

