# tslint-config-prettier
在前端开发中，代码规范的统一非常重要。为了保证代码风格的一致性，我们通常使用 linter 工具来检查代码是否符合指定的规范。但是，在使用 linter 工具时，有时候会出现与代码格式化工具冲突的问题。这时，我们可以通过使用` tslint-config-prettier` 这个 npm 包来解决这个问题。

## `tslint-config-prettier`是什么
它提供了很多规则，用来关闭`tslint`和`prettier`冲突的规则，从而能使`tslint`和`prettier`和平共处
使用`tslint-config-prettier`能保证使用`pretter`进行格式化工具的时候不会被`tslint`报错，也可以减少工作量

## 如何使用
1. 安装 tslint-config-prettier 依赖包
````shell
npm install tslint-config-prettier
yarn add tslint-config-prettier
pnpm i tslint-config-prettier
````
2. 创建tslint.json文件
可以手动添加文件，也可以使用命令生成，命令如下：
````shell
npx tslint --init
````
````json5
{
  // 或者在package.json文件中进行配置
  "script": {
    "tslint-lint": "tslint --init"
  }
}
````
3. 增加一些配置，运行命令
extend现在的tslint-json， 并且确定 tslint-config-prettier在最后
````json
{
  "extends": [
    "tslint:latest",
    "tslint-config-prettier"
  ]
}
````

更多请参考[官方文档](https://github.com/prettier/tslint-config-prettier)