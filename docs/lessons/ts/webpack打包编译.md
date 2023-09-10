# 第七章：打包编译
## 安装项目软件包

`创建package.json`

pnpm init 

`安装依赖包`

 pnpm i typescript webpack webpack-cli ts-loader webpack-dev-server -D

- typescript
- webpack 
- webpack-cli
- ts-loader : webpack处理ts的工具
- webpack-dev-server： 启动一个web服务器，开发过程中可以通过地址栏可以访问项目，修改代码，自动刷新页面

`创建ts配置文件`

tsc --init
## 配置webpack.config.jse文件
项目结构：

`webpack配置说明`

项目入口文件： 
```jsx
module.exports = {
	entry: '.src/index.ts',
}
```
项目编译输出位置：
```jsx
const path = require('path');
module.exports = {
  entry: '.src/index.ts', //项目的入口文件
  output: {
    filename: 'app.js',/ 项目最终打包的一个文件
    path: path.resolve(__dirname,'publicdist'), //  项目最终打包的目录，引入path，为了识别当前的路径，
  },
  module: {
    / 打包处理规则
    rules: [
      {
        test: \.tsx?$/, // 处理以tsx结尾或者ts结尾的文件，
        use: 'ts-loader', / 使用什么处理器进行处理文件
        exclude: node_modules/, // 排除node_modules文件夹不需要被处理
      }
    ]
  }
}

```
## 配置webpack的编译命令
修改package.json
添加编译命令：
```jsx
"scripts": {
  "dev": "webpack-dev-server --mode=development', /添加开发时的命令， --mode指定开发模式
  "build": "webpack --mode=production", /添加生产时候的命令： --mode指定生产模式
}
```
添加首页文件： index.html
使用pnpm dev运行项目
整个开发过程中，所有的数据都会加载到内存当中
![image.png](/public/ts/打包编译/1.png)
## webpack自动更新处理
在开发模式中下，所有的代码都被编译保存再内存中，如果我们想要拿到最新的代码，需要从内存中拿代码
在index。html中加载的js文件，咱目录下是根本没有的，这时候，在webpack配置了publicpath时候，webpack会从内存中读取读取这个数据
```jsx
const path = require('path');
module.exports = {
  entry: '.src/index.ts', //项目的入口文件
  output: {
    filename: 'app.js',/ 项目最终打包的一个文件
    path: path.resolve(__dirname,'publicdist'), //  项目最终打包的目录，引入path，为了识别当前的路径，
    publicPath: 'dist/',//表示资源在生产模式下的根路径
  },
  module: {
    / 打包处理规则
    rules: [
      {
        test: \.tsx?$/, // 处理以tsx结尾或者ts结尾的文件，
        use: 'ts-loader', / 使用什么处理器进行处理文件
        exclude: node_modules/, // 排除node_modules文件夹不需要被处理
      }
    ]
  }
}

```
![image.png](/public/ts/打包编译/2.png)
## ts中支持import 与 export
在ts中修改几个地方，让它支持模块 -----  将ts.confing.json中的module改为es6
webpack在处理的时候，如果发现导入的文件没有使用，他会把文件导入的过程给忽略掉，当开始使用的时候，就出问题了
提出问题？ 为什么绘制找不到呢？
解答问题： 因为这是ts，使用js的模块化，他可以自动追踪到js，但是追踪不到ts
解决问题:   
在webpack中增加配置和module同级：
```jsx
 resolve: {extensions: ['.ts','.tsx','.js']
           / 当引入一个文件的时候， 他会试图先查找ts, 如果ts没有，查找tsx, 最后js,第一个优先级是最高的
}
```
命名空间的导入导出也是完全支持的
```tsx
export let name:string  = '九辞'

export namespace User {
  export let title:string = 'jiuci.com'
}

```
```tsx
import {name,User} from '.user'

console.log(name);
console.log(User.title);

```
```jsx
const path = require('path');
module.exports = {
  entry: '.src/index.ts', //项目的入口文件
  output: {
    filename: 'app.js',/ 项目最终打包的一个文件
    path: path.resolve(__dirname,'publicdist'), //  项目最终打包的目录，引入path，为了识别当前的路径，
    publicPath: 'dist/',//表示资源在生产模式下的根路径
  },
  module: {
    / 打包处理规则
    rules: [
      {
        test: \.tsx?$/, // 处理以tsx结尾或者ts结尾的文件，
        use: 'ts-loader', / 使用什么处理器进行处理文件
        exclude: node_modules/, // 排除node_modules文件夹不需要被处理
      }
    ]
  },
  resolve: {
    extensions: ['.ts','.tsx','.js'],/ 导入文件的时候，文件的查找规则，优先查找.ts的文件，如果ts的文件没有找到，会找.tsx的文件，最后是js文件
  }
}

```
