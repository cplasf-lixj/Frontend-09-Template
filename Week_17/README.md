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

