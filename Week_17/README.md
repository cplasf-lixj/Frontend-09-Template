学习笔记



# YEOMAN

## 什么是Yeoman

Yeoman是一个脚手架系统，可以帮助开发者快速创建新的项目，它可以基于任何语言创建项目，如Java、Python、C#等。Yeoman自身是不做任何决定的，都是由Yeoman环境中的基础插件的生产者决定的。

## 安装

````shell
npm install -g yo
````

然后安装所学的generator, Generators都是以`generator-XYZ`命名的npm包。可以在[Yeoman website](https://yeoman.io/generators/)里搜索。例如安装webapp.

````shell
npm install -g generator-webapp
````

## 创建项目

创建名为webapp的新项目

````shell
yo webapp
````

### 其他命令

`yo --help` 访问所有的Help

`yo --generators` 列出所有已安装的generators

`yo --version` 获取版本号

`yo doctor` 诊断并提供解决问题的步骤





## 创建Generator

### Organizing your generators

`npm install --save yeoman-generator` 

#### 1、Node模块配置

• 创建一个名为`generator-name`的文件夹(name是generator的名字)，此处用generator-demo。

• `npm init`创建`package.json`文件。

• 配置package.json

````javascript
{
  "name": "generator-demo",
  "version": "0.1.0",
  "description": "",
  "files": [
    "generators"
  ],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  }
}
````

keywords必须包含"yeoman-generator", dependencies确保设置了`yeoman-generator`的最新版本，files必须是文件数组，里面是generator中使用的目录。

#### 2、文件树

```
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
```

或

```
├───package.json
├───app/
│   └───index.js
└───router/
    └───index.js
```

如果是这种结构，必须在files中列出所有文件夹。

```
{
  "files": [
    "app",
    "router"
  ]
}
```

### Extending generator

在index.js中添加如下代码：

```
var Generator = require('yeoman-generator');

module.exports = class extends Generator {};
```

#### 1、重新constructor

```javascript
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
};
```

#### 2、添加功能

```javascript
module.exports = class extends Generator {
  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }
};
```

### Running the generator

```shell
npm link

yo demo
```



### 非自动调用的方法

generator中的每个方法都被认为是一个任务，每个任务都会被按顺序自动运行。以下三种方法可以实现方法的不自动调用：

#### 1、以下划线(_)开头命名的方法

```javascript
class extends Generator {
     method1() {
       console.log('hey 1');
     }

     _private_method() {
       console.log('private hey');
     }
   }
```

#### 2、使用实例方法

```javascript
class extends Generator {
     constructor(args, opts) {
       // Calling the super constructor is important so our generator is correctly set up
       super(args, opts)

       this.helperMethod = function () {
         console.log('won\'t be called automatically');
       };
     }
   }
```

#### 3、扩展父generator

```javascript
class MyBase extends Generator {
     helper() {
       console.log('methods on the parent generator won\'t be called automatically');
     }
   }

   module.exports = class extends MyBase {
     exec() {
       this.helper();
     }
   };
```



### 用户交互

#### 1、Prompts

`prompt`方法是异步方法，返回一个promise。

```javascript
module.exports = class extends Generator {
  async prompting() {
    const answers = await this.prompt([
     
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);

    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
  }
};
```

```javascript
module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);
  }

  writing() {
    this.log("cool feature", this.answers.cool); // user answer `cool` used
  }
};
```

更多信息参考https://github.com/SBoudrias/Inquirer.js#documentation

#### 2、Arguments

arguments是直接通过命令行获取的。`yo webapp project-name`中的`project-name`是第一个参数。

通过`this.argument()`方法可以通知系统期望的参数。该方法接收两个参数，第一个是name，第二个是可选项键值对。

• `desc` 参数的描述

• `required` 是否为必传参数

• `type` String, Number, Array等

• `default` 参数的默认值

```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: true });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }
};
```

#### 3、Options

通过`this.option()` 方法通知系统期望的选项，通用接收两个参数，name和可选项键值对。

• `desc` option的描述

• `alias` option的short name

• `type` Boolean, String, Number

• `default` 参数的默认值

• `hide` 是否不显示在help中

```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option("coffee");

    // And you can then access it later; e.g.
    this.scriptSuffix = this.options.coffee ? ".coffee" : ".js";
  }
};
```



### 管理依赖

#### 1、npm

##### 1.1、npmInstall方法

调用`this.npmInstall()`方法运行npm安装。

````javascript
class extends Generator {
  installingLodash() {
    this.npmInstall(['lodash'], { 'save-dev': true });
  }
}
````

等同于：

````shell
npm install lodash --save-dev 
````

##### 1.2、以编程的方式管理npm依赖

可以用编程的方式创建或拓展`package.json`文件。

```javascript
class extends Generator {
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
  }
};
```

#### 2、Yarn

##### 2.1 yarnInstall方法

调用`this.yarnInstall()`方法运行安装。

```javascript
generators.Base.extend({
  installingLodash: function() {
    this.yarnInstall(['lodash'], { 'dev': true });
  }
});
```

等同于：

```shell
yarn add lodash --dev
```

#### 3、Bower

调用`this.bowerInstall()`方法运行安装。



### 操作文件系统

#### 1、Desctination上下文

通过`this.destinationRoot()`方法获取目标路径，通过`this.destinationPath()`方法拼接路径。

```javascript
class extends Generator {
  paths() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
    // returns '~/projects/index.js'
  }
}
```

#### 2、Template上下文

模板上下文定义`./templates`作为默认值，开发者可以使用`this.sourceRoot('new/template/path')`重写。

通过`this.sourceRoot()`方法使用的path值，通过`this.templatePath('app/index.js')`方法拼接路径。

```javascript
class extends Generator {
  paths() {
    this.sourceRoot();
    // returns './templates'

    this.templatePath('index.js');
    // returns './templates/index.js'
  }
};
```

#### 4、文件工具

`this.fs`暴露所有的文件方法，具体的可以参考[mem-fs editor](https://github.com/sboudrias/mem-fs-editor)



### Yeoman 5.0之后不支持this.npmInstall的问题：

```js
const _extend = require("lodash/extend");
const Generator = require("yeoman-generator");
_extend(Generator.prototype, require("yeoman-generator/lib/actions/install"));
```

https://gitmemory.com/issue/yeoman/yeoman/1752/859977106



# Webpack

## 1、安装

### 1.1、webpack 5.0版本

```bash
npm install --save-dev webpack
# 或指定版本
npm install --save-dev webpack@<version>
```

### 1.2、webpack v4+版本，还需要安装CLI

```bash
npm install --save-dev webpack-cli
```

## 2、Webpack五个核心概念

### 2.1、入口（entry)

**入口起点(entry point)** 指示 webpack 应该使用哪个模块，来作为构建其内部 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 `./src/index.js`，但你可以通过在 [webpack configuration](https://webpack.docschina.org/configuration) 中配置 `entry` 属性，来指定一个（或多个）不同的入口起点。

### 2.2、 输出(output) 

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

### 2.3、loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，**loader** 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。
2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。

***PS: webpack是一个领导，很多具体的事情需要安排手下去做，而loader就好比领导知道哪些事情谁可以去做。***

### 2.4、插件(plugin)

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

### 2.5、模式(mode)

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

生产环境比开发环境多一个压缩js代码的功能。

````js
const { resolve } = require('path');

module.exports  {
  // 入口七点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'bundle.js',
    // 输出路径
    path: resolve(__dirname, 'dist')
  },
  // loader的配置
  module: {
    rules: [
       {
         // 匹配规则
         test: /\.css$/,
         // 使用loader信息
         use: [
           // 创建style标签，将js中的样式资源插入到head中
           'style-loader',
           // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
           'css-loader'
         ]
       }
    ]
  },
  // plugins的配置
  plugins: [
    
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production', // 成产模式
}
````

## 3、Webpack优化

## 3.1、 分析工具

#### 3.1.1、体积分析

##### 3.1.1.1、初级分析

通过官方提供的stat.json文件分析打包结果，stat.json文件可以通过下面的语句快速生成：

````shell
webpack --profile --json > stats.json
````

通过官网[stats.json 分析工具](http://webpack.github.io/analyse/)进行分析，上传stats.json文件后，可以得到分析结果，其中包括 `webpack` 的版本、打包时间、打包过程的 `hash` 值、模块数量( `modules` )、`chunk` 数量、打包生层的静态文件 `assets` 以及打包的警告和错误数。

##### 3.1.1.2、第三方工具

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 是打包分析神器，在webpack.config.js的插件中使用

#### 3.1.2、速度分析

通过 [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) 插件分析整个打包的总耗时，以及每一个`loader` 和每一个 `plugins` 构建所耗费的时间，从而快速定位到可以优化 `Webpack` 的配置。

### 3.2、优化策略

#### 3.2.1、体积优化

##### 3.2.1.1、js压缩

`webpack4.0` 默认在生产环境的时候是支持代码压缩的，即 `mode=production` 模式下。

实际上 `webpack4.0` 默认是使用 [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) 压缩插件，在此之前是使用 [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)，两者的区别是后者对 ES6 的压缩不是很好，同时我们可以开启 `parallel` 参数，使用多进程压缩，加快压缩。

##### 3.2.1.2、CSS压缩

我们可以借助 `optimize-css-assets-webpack-plugin` 插件来压缩 `css`，其默认使用的压缩引擎是 `cssnano`。 具体使用如下：

````js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
}
````

**擦除无用的 `CSS`**

使用 `PurgeCSS` 来完成对无用 `css` 的擦除，它需要和 `mini-css-extract-plugin` 配合使用。

##### 3.2.1.3、图片压缩

首先要做的就是对于图片的优化，手动的去通过线上的图片压缩工具，如 [tiny png](https://tinypng.com/) 来压缩图片。

在项目中借助 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)实现图片自动压缩，它是基于 [imagemin](https://github.com/imagemin/imagemin) 这个 Node 库来实现图片压缩的。

````js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpeg 的配置
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
              optipng: {
                enabled: false,
              },
              // 使用 imagemin-pngquant 压缩 png
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              // 压缩 gif 的配置
              gifsicle: {
                interlaced: false,
              },
              // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
    ]
  }  
}
````

##### 3.2.1.4、拆分代码

使用 `splitChunksPlugin` 把一个大的文件分割成几个小的文件，可以有效的提升 `webpack` 的打包速度

#### 3.2.2、 速度优化

##### 3.2.2.1、分离两套配置

在开发阶段：我们需要 `webpack-dev-server` 来帮我们进行快速的开发，同时需要 **HMR 热更新** 帮我们进行页面的无刷新改动，而这些在 **生产环境** 中都是不需要的。

在生产阶段：我们需要进行 **代码压缩**、**目录清理**、**计算 hash**、**提取 CSS** 等等；

实现起来很简单，我们前面也提到过，就新建三个 `webpack` 的配置文件就行：

- `webpack.dev.js`：开发环境的配置文件
- `webpack.prod.js`：生产环境的配置文件
- `webpack.common.js`：公共配置文件

通过 `webpack-merge` 来整合两个配置文件共同的配置 `webpack.common.js`

##### 3.2.2.2、减少查找过程

对 `webpack` 的 `resolve` 参数进行合理配置，使用 `resolve` 字段告诉 `webpack` 怎么去搜索文件。

**合理使用 `resolve.extensions`**

在导入语句没带文件后缀时，`webpack` 会自动带上后缀后去尝试询问文件是否存在，查询的顺序是按照我们配置 的 `resolve.extensions` 顺序从前到后查找，`webpack` 默认支持的后缀是 `js` 与 `json`。

**优化 `resolve.modules`**

这个属性告诉 `webpack` 解析模块时应该搜索的目录，绝对路径和相对路径都能使用。使用绝对路径之后，将只在给定目录中搜索，从而减少模块的搜索层级：

```js
// config/webpack.common.js
const commonConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index', 'list'],
    alias: {
      alias: path.resolve(__dirname, '../src/alias'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 将默认写法放在后面
    ]
  }
}
```

**使用 `resolve.alias` 减少查找过程**

`alias` 的意思为 **别名**，能把原导入路径映射成一个新的导入路径。

##### 3.2.2.3、缩小构建目标

排除 `Webpack` 不需要解析的模块，即使用 `loader` 的时候，在尽量少的模块中去使用。

可以借助 `include` 和 `exclude` 这两个参数，规定 `loader` 只在那些模块应用和在哪些模块不应用。

修改公共配置文件 `webpack.common.js`：

```js
// config/webpack.common.js
const commonConfig = {
  module: {
    rules: [
      { 
        test: /\.js|jsx$/, 
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader']
      }
    ]
  },
}
```

##### 3.2.2.4、利用多线程提升构建速度

由于运行在 `Node.js` 之上的 `webpack` 是单线程模型的，所以 `webpack` 需要处理的事情需要一件一件的做，不能多件事一起做。

如果 `webpack` 能同一时间处理多个任务，发挥多核 `CPU` 电脑的威力，那么对其打包速度的提升肯定是有很大的作用的。

##### `HappyPack`

原理：每次 `webapck` 解析一个模块，`HappyPack` 会将它及它的依赖分配给 `worker` 线程中。处理完成之后，再将处理好的资源返回给 `HappyPack` 的主进程，从而加快打包速度。 

![](https://segmentfault.com/img/bVcLbDn )

将 `HappyPack` 引入配置文件，将相应的 `loader` 替换成 `happypack/loader`，同时将被替换的 `loader` 放入其插件的 `loaders` 选项，我们暂且替换一下 `babel-loader`：

`````js
const HappyPack = require('happypack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'happypack/loader'
          // 'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      loaders: ['babel-loader']
    })
  ]
}
`````

更多参数可以参考 [HappyPack 官网](https://github.com/amireh/happypack)

##### `thread-loader`

`webpack` 官方推出的一个多进程方案，用来替代 `HappyPack`。

原理和 `HappyPack` 类似，`webpack` 每次解析一个模块，`thread-loader` 会将它及它的依赖分配给 `worker` 线程中，从而达到多进程打包的目的。

使用很简单，直接在我们使用的 `loader` 之前加上 `thread-loader` 就行

````js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
					{
            loader: 'thread-loader',
            options: {
              workers: 3,// 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
            }
          },
          'babel-loader'
        ]
      }
    ]
  }
}
````

##### 3.2.2.5、预先编译资源模块（DllPlugin）

一般来说第三方模块是不会变化的，所以只要在第一次打包的时候去打包一下第三方模块，并将第三方模块打包到一个特定的文件中，当第二次 `webpack` 进行打包的时候，就不需要去 `node_modules` 中去引入第三方模块，而是直接使用我们第一次打包的第三方模块的文件就行。

`webpack.DllPlugin` 就是来解决这个问题的插件。

1、在配置文件目录 `config` 下新建一个 `webpack.dll.js`，此文件用于将我们的第三方包文件打包到 `dll` 文件夹中去：

```js
// config/webpack.dll.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // 环境
  entry: {
    vendors: ['lodash'], // 将 lodash 打包到 vendors.js 下
    react: ['react', 'react-dom'], // 将 react 和 react-dom 打包到 react.js 下
  },
  output: {
    filename: '[name].dll.js', // 输出的名字
    path: path.resolve(__dirname, '../dll'), // 输出的文件目录
    library: '[name]' // 将我们打包出来的文件以全部变量的形式暴露，可以在浏览器变量的名字进行访问
  },
  plugins: [
    // 对生成的库文件进行分析，生成库文件与业务文件的映射关系，将结果放在 mainfest.json 文件中
    new webpack.DllPlugin({
      name: '[name]', // 和上面的 library 输出的名字要相同
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    })
  ]
}
```

- 上面的 `library` 的意思其实就是将 `dll` 文件以一个全局变量的形式导出出去，便于接下来引用
- `mainfest.json` 文件是一个映射关系，它的作用就是帮助 `webpack` 使用我们之前打包好的 `***.dll.js` 文件，而不是重新再去 `node_modules` 中去寻找。

2、修改公共配置文件 `webpack.common.js`，借助一个插件 `add-asset-html-webpack-plugin`，将之前生成的 `dll` 文件导入到 `html` 中去。

```js
// config/webpack.common.js
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const commonConfig = {
  plugins: [
    // ...
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/react.dll.js')
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dll/vendors.dll.mainfest.json'))
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dll/react.dll.mainfest.json'))
    }),
  ]
}
```

##### 3.2.2.6、缓存Cache相关

开启相应 `loader` 或者 `plugin` 的缓存，来提升二次构建的速度。一般我们可以通过下面几项来完成：

- `babel-loader` 开启缓存
- `terser-webpack-plugin` 开启缓存
- 使用 `cache-loader` 或者 [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

如果项目中有缓存的话，在 `node_modules` 下会有相应的 `.cache` 目录来存放相应的缓存。



# Babel基本知识

## 1、作用

将新版本的JS编译成老版本的JS

## 2、安装

````js
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
````

## 3、配置

````json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
````

