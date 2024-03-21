# webpack面试题

## 1.  webpack的构建流程

webpack就是将源代码通过编译（构建、打包）生成最终代码


![Alt text](image-44.png)

整个过程大致分为三步：

- 初始化
- 编译
- 输出





### 1. 初始化

此阶段，webpack会将CLI参数、配置文件、默认配置进行融合，形成一个最终的配置对象

对配置的处理是依托一个第三方库yargs完成的

此阶段相对来说比较简单，主要是为接下来的编译阶段做好准备

目前，可以简单的理解为，初始化节点主要用于产生一个最终的配置







### 2. 编译

#### 1. 创建chunk

chunk是webpack在内部构建过程中的一个概念，译为块，他表示通过某个入口文件找到的所有依赖的统称。

根据入口文件默认（默认为./src/index.js）创建一个chunk

![Alt text](image-45.png)

chunk是由名字的

- name： 默认是name
- id： 唯一编号，在开发模式下与name相同，在生产模式下是一个数字，由0开始

#### 2. 构建所有依赖模块

![Alt text](image-46.png)



首先会在当前chunk中从入口开始检索，会先判断当前依赖是否记录，如果没有记录开始读取文件内容，将文件的内容转化为AST（目的是生成树形结构，然后遍历树形结构，找到所有的依赖）然后缓存到dependiences中（是一个数组，数组中的每一项内容为相对于根目录的相对地址`./src/index.js`），将这个require替换为_webpack_require()，然后进行保存，模块ID对应的转换后的代码

````js
require('./a.js')
console.log('abc')


// 转化后的代码模块
_webpack_require('./src/a.js')
````

只是将代码转换为这种格式，不调用函数

如果加载模块的时候，发现模块又引入了其他的模块，那么他会在加载完这个模块之后，再去加载依赖的模块，如果是依赖的第三方模块，那么他会从node_modules中加载，如此递归下去，知道全部加载完，全部转换，每转换一个都会填充到这个列表里面，

总之，通过递归的方式，将整个项目中所有的模块都加载，构建所有的依赖模块，这一步骤也是最复杂的

#### 3. 产生chunk assets

在第二步完成之后，chunk会生成一个模块列表，列表中包含了模块id和模块转化后的代码

接下来，webpack会根据配置为chunk生成一个资源列表，即chunk assets；资源列表可以理解为是生成到最终文件的文件名和文件内容


![Alt text](image-47.png)

> chunk hash是根据生成的文件列表中的所有的内容（将一个chunk里面的所有的内容联合起来生成一个hash）
>
> hash：一个算法，具体有很多种类，特点是能将一个任意长度的字符串转化为一个固定长度的字符串，而且可以保证只要原始内容没有发生变化，产生的hash字符串就不变

#### 4. 合并 chunk assets

会将多个chunk的assets合并到一起，并产生一个总的hash

![Alt text](image-48.png)



### 3. 输出
此步骤非常简单，webpack将利用nodejs模块中的fs模块（文件处理模块），根据编译生成的总的assets，生成相应的文件


![Alt text](image-49.png)



### 4. 总过程

![Alt text](image-50.png)



当从命令行敲下webpack打包命令的时候，先会进行初始化，将cli参数，配置文件，默认配置进行融合，形成一个最终的配置对象

把生成的配置对象交给编译器，他可能会有一个chunk，有可能会有多个chunk，至少会有一个，在每个chunk里面，他要构建好自己的模块，他把这个chunk里面所有相关的模块找到，找到之后会生成一个资源列表（表示这个chunk最终会对应哪些资源）每个chunk会有自己的名字、id和hash，hash是通过这个资源列表算出来的。

最后把每一个chunk生成的资源合并成一个完整的资源，并且生成一个完整的hash，最终根据这个完整的资源列表输出到文件

（从入口文件开始查找，然后判断该模块是否已经记录，然后读取文件内容，将文件内容生成ast，通过递归AST，转化原有代码的格式，然后将代码格式和chunk名称对应起来进行存储，得到一个模块列表）





> webpack的运行流程是一个串行的流程、也就是从启动到结束会经历一些流程
>
> 首先第一个就是进行`初始化`: 将cli参数、配置文件中的配置、默认配置进行融合，生成最终的一个配置对象
>
> 第二步：`开始编译`，用上一步得到的配置对象，加载我们所有配置的插件，执行对象的run方法
>
> 第三步才是`确定入口`，根据配置中的entry，找到所有的一个入口文件
>
> 第四步：`编译模块`， 从入口文件开始触发，调用所有的loader，对模块进行一个编译，再找出该模块所依赖的所有模块，递归这个步骤，直到所有的入口文件都经过了这个步骤，得到被编译的一个最终内容，还有他们之间的依赖关系
>
> 第五步：`输出资源`



在以上的过程中，webpack就会在特定的时间点广播出特定的事件，插件会在监听到一些事件之后





### 5. 专业术语



- module：模块、分割的代码单元、webpack中的模块可以是任意内容的文件，不仅限于js。

- chunk：webpack内部构建模块的一个块，一个chunk中可以包含很多块，这些模块是从入口文件中进行以来分析得来的。

- bundle：chunk构建好模块之后生成的chunk的资源列表，列表中的每一项就是一个bundle，可以认为bundle就是最终生成的文件。

- hash：最终的资源清单上所有内容联合生成的hash值

- chunkhash：chunk生成的资源清单内容联合生成的hash值

- chunkname：chunk的名称，如果没有配置的话，就是用main

- id： 通常指的是chunk的唯一编号，如果在开发环境下构建，和chunkname相同，如果是在生产模式下的构建，则使用一个从0开始的数字进行编号





## 2. loader和plugin的区别





- loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
- plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事



从整个运行时机上来看，如下图所示：

![img](https://static.vue-js.com/9a04ec40-a7c2-11eb-ab90-d9ae814b240d.png)

可以看到，两者在运行时机上的区别：

- loader 运行在打包文件之前
- plugins 在整个编译周期都起作用

在`Webpack` 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过`Webpack`提供的 `API`改变输出结果

对于`loader`，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将`A.scss`或`A.less`转变为`B.css`，单纯的文件转换过程





###  1. 编写loader



在编写 `loader` 前，我们首先需要了解 `loader` 的本质

其本质为函数，函数中的 `this` 作为上下文会被 `webpack` 填充，因此我们不能将 `loader`设为一个箭头函数

函数接受一个参数，为 `webpack` 传递给 `loader` 的文件源内容

函数中 `this` 是由 `webpack` 提供的对象，能够获取当前 `loader` 所需要的各种信息

函数中有异步操作或同步操作，异步操作通过 `this.callback` 返回，返回值要求为 `string` 或者 `Buffer`

代码如下所示：

```js
解释// 导出一个函数，source为webpack传递给loader的文件源内容
module.exports = function(source) {
    const content = doSomeThing2JsString(source);
    
    // 如果 loader 配置了 options 对象，那么this.query将指向 options
    const options = this.query;
    
    // 可以用作解析其他模块路径的上下文
    console.log('this.context');
    
    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    this.callback(null, content); // 异步
    return content; // 同步
}
```

一般在编写`loader`的过程中，保持功能单一，避免做多种功能

如`less`文件转换成 `css`文件也不是一步到位，而是 `less-loader`、`css-loader`、`style-loader`几个 `loader`的链式调用才能完成转换



### 2. 编写plugin

webpack的plugins本质上就是一个带有apply方法的对象，该方法会接受一个compile对象，

由于`webpack`基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务

在之前也了解过，`webpack`编译会创建两个核心对象：

- compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子
- compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建

如果自己要实现`plugin`，也需要遵循一定的规范：

- 插件必须是一个函数或者是一个包含 `apply` 方法的对象，这样才能访问`compiler`实例
- 传给每个插件的 `compiler` 和 `compilation` 对象都是同一个引用，因此不建议修改
- 异步的事件需要在插件处理完任务时调用回调函数通知 `Webpack` 进入下一个流程，不然会卡住

实现`plugin`的模板如下：

```js
解释class MyPlugin {
    // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation: 当前打包构建流程的上下文
        console.log(compilation);
        
        // do something...
    })
  }
}
```

在 `emit` 事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容





## 3. webpack的热更新原理

`HMR`全称 `Hot Module Replacement`，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失

如果使用的是 `HMR`，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用

在`webpack`中配置开启热模块也非常的简单，如下代码：

```js
const webpack = require('webpack')
module.exports = {
  // ...
  devServer: {
    // 开启 HMR 特性
    hot: true
    // hotOnly: true
  }
}
```

实现原理：







## 4. webpack的性能优化



webpack的性能优化从以下两个方面来入手：打包速度的优化、打包体积的优化

### 1. 打包速度的优化

要进行打包速度的优化，首先我们需要搞明白哪一些流程的在打包执行过程中耗时较长。



#### 1. 速度分析

这里我们可以借助 `speed-measure-webpack-plugin` 插件，它分析 webpack 的总打包耗时以及每个 plugin 和 loader 的打包耗时，从而让我们对打包时间较长的部分进行针对性优化。

#### 2. cdn优化

针对于某些特别大的第三方包，可以使用cdn，，例如 react 和 react-dom，我们可以通过 cdn 的形式引入它们，然后将 `react`、`react-dom` 从打包列表中排除，这样可以减少打包所需的时间。

`html-webpack-externals-plugin`

#### 3. 打包时开启多线程

对于耗时较长的模块，同时开启多个 nodejs 进程程进行构建，可以有效地提升打包的速度。可以采取的一些方式有：

- thread-loader

#### 4. 压缩

对js进行压缩，对css进行压缩，包括对于html也可以进行压缩

使用以下插件：`terser-webpack-plugin、 css-minimizier-webpack-plugin、html-minimizier-webpack-plugin`

webpack5版本内置了 `terser-webpack-plugin` 的配置，如果是 v4 或者更低版本，执行以下命令安装 `terser-webpack-plugin` 

````js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
      // js压缩
      new TerserPlugin({
        parallel: cpuCount,
      }),
    ],
  },
};

````

#### 5. 资源预编译

通过预编译资源模块，可以代替 cdn 分包的方式，解决每个模块都得引用一个 script 的缺陷。

还是以 react 和 react-dom 为例，新建一个 `webpack.dll.js` 文件，用于预编译资源的打包，例如要对 react 和 react-dom 进行预编译，配置如下：

````js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    library: ['react', 'react-dom'],
  },
  output: {
    filename: 'react-library.dll.js',
    path: path.resolve(__dirname, './dll'),
    library: '[name]_[hash]', // 对应的包映射名
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[hash]', // 引用的包映射名
      path: path.join(__dirname, './dll/react-library.json'),
    }),
  ],
};

````

#### 5. 使用缓存

通过使用缓存，能够有效提升打包速度。缓存主要有以下几种方案：

- 使用 webpack5 内置的 cache 模块
- cache-loader（webpack5内置了 cache 模块后可弃用 cache-loader）

webpack5 内置了 cache 模块，缓存生成的 webpack 模块和 chunk，来改善构建速度。它在开发环境下会默认设置为 `type: 'memory'` 而在生产环境中被禁用。`cache: { type: 'memory' }` 与 `cache: true` 作用一样，可以通过设置 `cache: { type: 'filesystem' }` 来开放更多配置项。

````js
module.exports = {
  cache: {
    type: 'filesystem',
  },
};

````

会在 node_modules 目录下生成一个 .cache 目录缓存文件内容，且二次打包速度显著提升：

这点和pnpm生成的node_modules差不多

在一些性能开销较大的 loader 之前添加 `cache-loader`，能将结果缓存到磁盘里。保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用。

在 `webpack.config.js` 对应的开销大的 loader 前加上 `cache-loader`:

````js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  }
}

````

#### 6. 缩小构建范围

通过合理配置 `rules` 中的文件查找范围，可以减少打包的范围，从而提升打包速度。

通过配置exclude，移除掉不需要打包的文件，比如node_modules

````js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};

````



#### 7. 加快文件查找体积

通过合理配置 webpack 的 resolve 模块，可以加快文件的查找速度，例如可以对如下的选项进行配置：

- resolve.modules 减少模块搜索层级，指定当前 node_modules，慎用。
- resovle.mainFields 指定包的入口文件。
- resolve.extension 对于没有指定后缀的引用，指定解析的文件后缀查找顺序
- 合理使用 alias，指定第三方依赖的查找路径 对 `webpack.config.js` 作如下配置：

```js
module.exports = {
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
    },
    modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['main'],
  },
};
```



### 2. 打包体积优化

同速度优化一样，我们要对体积进行优化，也需要了解打包时各个模块的体积大小。这里借助 `webpack-bundle-analyzer` 插件，它可以分析打包的总体积、各个组件的体积以及引入的第三方依赖的体积。

执行如下命令安装 `webpack-bundle-analyzer`:

```perl
yarn add webpack-bundle-analyzer -D
```

在 `webpack.config.js` 中添加如下配置：

```js
js复制代码const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin()
  ],
};
```

然后执行 webpack 打包命令，会在 `localhost:8888` 页面看到打包后的体积分析：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d117f59fc16f4b3c9980e576839c13ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)



#### 1. 公共模块的提取

及其依赖的组件中都会引入一份 `react` 和 `react-dom` ，那最终打包后的每个页面中同样也会有一份以上两个包的代码。我们可以将这两个包单独抽离出来，最终在每个打包后的页面入口文件中引入，从而减少打包后的总体积。

在 `webpack.config.js` 中添加如下配置：

```js
js复制代码module.exports = {
  optimization: {
    splitChunks: {
      minSize: 20000,
      cacheGroups: {
        react: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  }
};
```

#### 2. 文件压缩

html的压缩，使用`html-minimizier-webpack-plugin`

css的压缩，使用`css-minimizier-webpack-plugin`

js的压缩，使用`terser-webpack-plugin`

图片压缩：

使用 `image-minimizer-webpack-plugin` 配合 `imagemin` 可以在打包时实现图片的压缩。

执行如下命令安装 `image-minimizer-webpack-plugin` 配合 `imagemin` ：

```arduino
npm install image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

在 `webpack.config.js` 中新增如下配置：

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
```

#### 3. 移除无用的css

通过 `purgecss-webpack-plugin`，可以识别没有用到的 class，将其从 css 文件中 treeShaking 掉，需要配合 `mini-css-extract-plugin` 一起使用。

执行如下命令安装  `purgecss-webpack-plugin`：

```perl
perl
复制代码npm install purgecss-webpack-plugin -D
```

在 `webpack.config.js` 文件中做如下配置：

```js
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ]
```

但是这种方式会出现问题，部分css无法被识别，还需要配置白名单。







## 5. webpack中常用的loader

css-loader

style-loader

less-loader

postcss-loader

babel-loader

file-loader





## 6. webpack中哪些常用的plugin

html-webpack-plugin

terser-webpack-plugin

css-minimizier-webpack-plugin

html-minimizier-webpack-plugin

image-minizier-webpack-plugin

eslint-webpack-plugin

webpack-dll-plugin

workbox-webpack-plugin



## 8.  source map是什么，生产环境怎么用



## 9. tree shaking原理



## 11. webpack的五大核心是什么

entry

output

module

plugins

mode