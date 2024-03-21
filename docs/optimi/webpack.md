# Webpack性能优化

webpack的性能优化，要比vite配置的更要多
webpack的优化，主要从以下几个方面进行配置
提升打包速度、减少打包体积
打包速度的提升可以借助`speed-measure-webpack-plugin`来分析，它分析了整个打包的时间，以及各个loader和plugins的打包时间，然后根据哪些内容的打包时间过长，然后进行有效的处理
1. cdn优化或者使用模块预解析或者懒加载
`html-webpack-externals-plugin`或者`webpack-dll-plugin`
2. 打包开启多线程
`thread-loader`
3. 压缩
js压缩：`terser-webpack-plugin`
css压缩：`css-minimizier-webpack-plugin`
html压缩：`html-minimizier-webpack-plugin`
图片压缩：`image-minimizier-webpack-plugin`
4. 使用缓存
webpack5内置了缓存模块，当然也可以使用cache-loader
5. 缩小构建范围
使用exclude将node_modules进行去除掉
6. 在文件查找的时候，添加文件查找规则
resolve里面配置extensions


针对于打包体积的一个减少，主要有个体积分析插件`webpack-boundle-analyzer`
1. 压缩
2. tree-shaking
3. 代码分割(分块)
4. 公共代码的提取


## 1. 速度分析

这里我们可以借助 `speed-measure-webpack-plugin` 插件，它分析 webpack 的总打包耗时以及每个 plugin 和 loader 的打包耗时，从而让我们对打包时间较长的部分进行针对性优化。
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





## 2. cdn优化

针对于某些特别大的第三方包，可以使用cdn，，例如 react 和 react-dom，我们可以通过 cdn 的形式引入它们，然后将 `react`、`react-dom` 从打包列表中排除，这样可以减少打包所需的时间。

`html-webpack-externals-plugin`





## 3. 打包时开启多线程

对于耗时较长的模块，同时开启多个 nodejs 进程程进行构建，可以有效地提升打包的速度。可以采取的一些方式有：

- thread-loader

## 4. 压缩

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

## 5. 资源预编译

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

## 5. 使用缓存

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

## 6. 缩小构建范围

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



## 7. 加快文件查找体积

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



## 8. 公共模块的提取

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


## 9. 移除无用的css

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



## 10. 代码分割

````js
 optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: cpuCount
      })
    ],
    // 代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 组，哪些模块要打包到一个组
         defaultVendors: { // 组名 
           test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
           priority: -10, // 权重（越大越高）
            reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  },
````