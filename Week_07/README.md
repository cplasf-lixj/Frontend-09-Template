学习笔记



# 运算符和表达式

## Priority

​	• + -

​	• * /

​	• ()

## Member Expression

​	• a.b

​	• a[b]

​	• foo`string`

​	• super.b

​	• super['b']

​	• new.target

​	• new Foo()

## New Expression

​	• new Foo

	### Example

​	• <font color="green">new a()() = (new a())()</font>

​	•<font color=green> new new a()  = new (new a())</font>

## Call Expression

​	• foo()

​	• super()

​	•<font color=red> foo()</font>['b']

​	• <font color=red>foo()</font>.b

​	• <font color=red>foo()</font>`abc`

## Left Handside & Right Handside



## Update Expression

​	属于Right Handside

​	• a ++

​	• a --

​	• -- a

​	• ++ a

	### Example

<font color=green>++ a ++ = ++ (a ++)</font>

## Unary Expression

​	• delete a.b

​	• void foo()

​	• typeof a

​	• + a

​	• - a

​	• ~ a

​	• ! a

​	• await a

## Exponetal Expression

​	• **

### Example

<font color=green>3 ** 2 ** 3 = 3 **  (2 ** 3)</font>

## Multiplicative Expression

​	• *、 /、 %

## Additive Expression

​	• +、 -

## Shift Expression

​	• <<、 >>、 >>>

## Relationship

​	• <、>、<=、 >=、 instanceof、 in

## Equality Expression

​	• ==

​	• !=

​	• ===

​	• !==

## Bitwise

​	• &、 ^、 |

## Logical Expression

​	短路原则

​	• &&

​	• ||

## Conditional Expression

​	• ? :



# Type Convertion

​	• a + b

​	• "false" == false	x

​	• a[o] = 1



# Completion Record

• [[type]]: normal, break, continue, return, or throw

• [[value]]: 基本类型

• [[target]]: label



# 语句

<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_07/8186219674547691cf59e5c095304d55.png" alt="statement" style="zoom:50%;" />

# 简单语句

​	• ExpressionStatement		表达式语言

​	• EmptyStatement				空语句，`；`

​	• DebuggerStatement		 调试语言

​	• ThrowStatement				抛出异常语句 throw error

​	• ContinueStatement			结束单次循环

​	• BreakStatement 				 结束循环

​	• ReturnStatement				返回语句，函数体内使用

# 复合语句

​	• BlockStatement					块语句

​		{

​			xxx；

​			yyy;

​			zzz;

​		}

​	• IfStatement						   分支结构

​	• SwitchStatement				  多分支结构

​	• IterationStatement			  迭代语句，如while、do-while、for、for await

​		while(xx) { yy }

​		do { yy } while(xx)

​		for( aa; bb; cc) { yy }

​		for( xx in zz) { yy }

​		for(xx of zz) { yy }

​		~~for await( of )~~

​	• WithStatement					 with打开一个对象，不建议使用

​	• LabelledStatement				在简单或复合语句前面加上label

​	• TryStatement						三段结构语句， try、catch和finally

​		try {

​			xx;

​		} catch ( err ) {

​			yy;

​		} finally {

​			zz;		//finally一定会被执行

​		}

# 声明

​	<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_07/0e5327528df12d1eaad52c4005efff38.jpg" alt="declaration" style="zoom:50%;" />

​	• FunctionDeclaration						function

​	• GeneratorDeclaration					 function *

​	• AsyncFunctionDeclaration			 async function

​	• AsyncGeneratorDeclaration		  async function *	

​	• VariableStatement						  var

​	• ClassDeclaration							 class

​	• LexicalDeclaration						  const、let   <font color=red> (在声明之前使用会报错)</font>

# 作用域

​	var和function的作用范围是函数体

​	const和let的作用范围是block内

# 结构化

## JS执行粒度（运行时）<font color=red size=5px>犹大到小</font>

​	• 宏任务  <font color=orange>传给JavaScript引擎的任务</font>

​	• 微任务(Promise) <font color=orange>在JavaScript引擎内部执行的任务</font>

​	• 函数调用(Execution Context)

​	• 语句/声明(Completion Record)

​	• 表达式(Reference)

​	• 直接量/变量/this...

## 事件循环

​	<img src="/Users/lixiangju/Documents/LeeXJ/WebStudy/Frontend-09-Template/Week_07/event_run.png" alt="事件循环" style="zoom:50%;" />

## 函数调用

	### Execution Context

​	• code evaluation state			用于async和generator函数

​	• Function								  Function初始化

​	• Script or Module					Script或Module两种上下文	

​	• Generator								

​			只有Generator函数需要，即Generator函数每次执行所生成的隐藏在背后的Generator

​			只有Generator函数创建的执行上下文才会有Generator字段

​	• Realm

​			保存所有使用的内置对象的领域

​	• LexicalEnvironment

​			• this

​			• new.target

​			• super

​			• 变量

​	• VariableEnvironment

​			仅仅用于处理var声明

## Environment Records

### 	Declarative Environment Records

	#### 		Function Environment Records

#### 		module Environment Records

### 	Global Environment Records

### 	Object Environment Records

参考文档 [JavaScript. The Core.](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)



