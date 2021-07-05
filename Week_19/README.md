学习笔记



# Server搭建Nodejs环境

## 1、安装nodejs

````js
sudo apt install nodejs
````

## 2、安装npm

````js
sudo apt install npm
````

## 3、更新nodejs版本

````js
// 先安装n
sudo npm install -g n

// 安装最新版本
sudo n latest
````

<img src="/Users/lixiangju/Desktop/Screen Shot 2021-07-04 at 15.48.19.png" alt="Screen Shot 2021-07-04 at 15.48.19" style="zoom:100%;" />





# Express

## 1、什么是Express？

高度包容、快速而极简的Node.js Web框架，为Web和移动应用程序提供一组强大的功能。

## 2、安装

### 2.1 创建项目目录

````js
mkdir myapp && cd myapp
````

### 2.2 创建package.json文件

使用npm init 命令为应用程序创建package.json文件。

````js
npm init
````

### 2.3 安装express

````js
npm install express --save
或
npm install express --no-save
````

## 3、Express应用程序生成器

可使用应用程序生成器工具 (`express-generator`) 快速创建应用程序框架。

您可以使用 `npx` 命令（在 Node.js 8.2.0 中可用）运行应用程序生成器。

````js
npx express-generator
````

对于早期的 Node 版本，可将应用程序生成器作为全局 npm 软件包安装，然后启动它。

````js
npm install -g express-generator
express
````

在 MacOS 或 Linux 上，采用以下命令运行此应用程序：

```sh
DEBUG=myapp:* npm start
```

在 Windows 命令提示符上，使用以下命令：

```sh
set DEBUG=myapp:* & npm start
```

在 Windows PowerShell 上，使用以下命令：

```sh
PS> $env:DEBUG='myapp:*'; npm start
```

## 4、基本路由

*路由*用于确定应用程序如何响应对特定端点的客户机请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。

每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。

路由定义采用以下结构：

```javascript
app.METHOD(PATH, HANDLER)
```

其中：

- `app` 是 `express` 的实例。
- `METHOD` 是 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是服务器上的路径。
- `HANDLER` 是在路由匹配时执行的函数。

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```

## 5、静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 `express.static` 内置中间件函数。

将包含静态资源的目录的名称传递给 `express.static` 中间件函数，以便开始直接提供这些文件。例如，使用以下代码在名为 `public` 的目录中提供图像、CSS 文件和 JavaScript 文件：

```javascript
app.use(express.static('public'));
```

现在，可以访问位于 `public` 目录中的文件：

```javascript
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

要使用多个静态资源目录，请多次调用 `express.static` 中间件函数：

```javascript
app.use(express.static('public'));
app.use(express.static('files'));
```

要为 `express.static` 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中），请为静态目录[指定安装路径](https://expressjs.com/zh-cn/4x/api.html#app.use)，如下所示：

```javascript
app.use('/static', express.static('public'));
```

现在，可以访问具有 `/static` 路径前缀的 `public` 目录中的文件。

```javascript
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

然而，向 `express.static` 函数提供的路径相对于您在其中启动 `node` 进程的目录。如果从另一个目录运行 Express 应用程序，那么对于提供资源的目录使用绝对路径会更安全：

```javascript
app.use('/static', express.static(__dirname + '/public'));
```

Express 支持对应于 HTTP 方法的以下路由方法：`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search` 和 `connect`。

**响应方法**

下表中响应对象 (`res`) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。

| 方法                                                         | 描述                                             |
| ------------------------------------------------------------ | ------------------------------------------------ |
| [res.download()](https://expressjs.com/zh-cn/4x/api.html#res.download) | 提示将要下载文件。                               |
| [res.end()](https://expressjs.com/zh-cn/4x/api.html#res.end) | 结束响应进程。                                   |
| [res.json()](https://expressjs.com/zh-cn/4x/api.html#res.json) | 发送 JSON 响应。                                 |
| [res.jsonp()](https://expressjs.com/zh-cn/4x/api.html#res.jsonp) | 在 JSONP 的支持下发送 JSON 响应。                |
| [res.redirect()](https://expressjs.com/zh-cn/4x/api.html#res.redirect) | 重定向请求。                                     |
| [res.render()](https://expressjs.com/zh-cn/4x/api.html#res.render) | 呈现视图模板。                                   |
| [res.send()](https://expressjs.com/zh-cn/4x/api.html#res.send) | 发送各种类型的响应。                             |
| [res.sendFile()](https://expressjs.com/zh-cn/4x/api.html#res.sendFile) | 以八位元流形式发送文件。                         |
| [res.sendStatus()](https://expressjs.com/zh-cn/4x/api.html#res.sendStatus) | 设置响应状态码并以响应主体形式发送其字符串表示。 |



