学习笔记

# 语言按语法分类
  ## 非形式语言
    ### 中文, 英文
  ## 形式语言
    ### 乔姆斯基谱系
      • 0型 无限制文法
      • 1型 上下文相关文法
      • 2型 上下文无关文法
      • 3型 正则文法

# 产生式(BNF)
  ## 在计算机中指Tiger编辑器将源程序经过词法分析和语法分析后得到的一系列符合文法规则的语句
  ## 巴科斯诺尔范式：
    ### 一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。
  • 用尖括号括起来的名称表示`语法结构名`
  • 语法结构分成基础结构和需要用其他语法结构定义的`复合结构`
    • 基础结构称`终结符`
    • 复合结构称`非终结符`
  • 引号和中间的字符表示终结符
  • 可以有括号
  • `*`表示重复多次
  • `|`表示或
  • `+`表示至少一次
  • 四则运算：
    • 1 + 2 * 3
  • 终结符
    • Number
    • + - * /
  • 非终结符
    • MultiplicativeExpression
    • AddtiveExpression

# 通过产生式理解乔姆斯基谱系

## 0型 无限制文法

​	•  ?::=?

## 1型 上下文相关文法

​	• <font color=blue>?</font><A> <font color=orange>?</font>::=<font color=blue>?</font><B> <font color=orange>?</font>

​	• <font color=blue>?</font> 上文

​	• <font color=orange>?</font> 下文

  ## 2型 上下文无关文法

​	• <A>::=?

  ## 3型 正则文法

​	• <A>::=<A>?

​    • <A>::=?<A> <font color=red>x</font>



# 语言分类

## 形式语言---用途

​	• 数据描述语言

​	json, html, xaml, sql, css

​	• 编程语言

​	C, C++, Java, C#, Python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, JavaScript

## 形式语言---表达方式

​	• 声明式语言

​	JSON, HTML, XAML, SQL, CSS, Lisp, Clojure, Haskell

​	• 命令式语言

​	C, C++, Java, C#, Python, Ruby, Perl, JavaScript

# 图灵完备性

	## 图灵完备性

​	• 命令式----图灵机

​		• goto

​		• if和while

​	• 声明式----lambda

​		• 递归

# 动态与静态

## 动态

​	• 在用户的设备/在线服务器上

​	• 产品实际运行时

​	• Runtime

## 静态

​	• 在程序员的设备上

​	• 产品开发时

​	• Compiletime

# 类型系统

## 动态类型系统与静态类型系统

## 强类型(无隐式转换)与弱类型(有隐式转换)

​	• 强类型语言：Go,  Swift等

​	• 弱类型语言：JavaScript,  Java, Objective-C等 

​	• String + Number

​	• String == Boolean

## 复合类型

​	• 结构体

​	• 函数签名

## 子类型

## 泛型

​	• 逆变/协变 

​		https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance

​		https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html

​		协变：凡是能用Array<Parent>的地方，都能用Array<Child>

​		逆变：凡是能用Function<Child>的地方，都能用Function<Parent>

# 一般命令式编程语言

## Atom

​	• Identifier

​	• Literal

## Expression

​	• Atom

​	• Operator

​	• Punctuator

## Statement

​	• Expression

​	• Keyword

​	• Punctuator

## Structure

​	• Function

​	• Class

​	• Process

​	• Namspace

​	• ......

## Program

​	• Program

​	• Module

​	• Package

​	• Libary

# 重学JavaScript

​	语法 -> 语义 -> 运行时

# Object三要素

​	• Identifier---唯一标识

​	• State---状态

​	• Behavior---行为

# Object-Class

​	类是一种常见的描述对象的方式。

	## 分类流派

​	• 归类----研究单个对象，提取共性变成类。鱼和羊提取共性为动物类。对于 “归类” 方法而言，多继承是非常自然的事情

​	• 分类----世间万物抽象为基类Object，采用分类思想的计算机语言，则是单继承结构。

# Object-Prototype

