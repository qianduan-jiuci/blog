# 代码风格格式化
代码的风格一直是都是系统开发过程中很容易出现的一个问题，不同开发人员有着不同代码格式化方案，在实际开发过程中有必要统一代码格式，这时候，代码的格式化作用就很明显

在前端中，代码格式化常用的技术有一下：
- 代码格式化保存工具：`prettier`
- 在使用js开发的时候，安装`Eslint`对代码格式进行检验，查看是否符合标准
- 在使用ts进行开发的时候，使用`Tslint`取代`Eslint`
- 为了让格式校验工具和格式化工具友好相处，就需要一方进行让步，这种库有很多，常用的是`tslint-config-prettier`、`eslint-config-prettier`、`stylelint-config-prettier`,现在主要介绍tslint-config-prettier，另外两个原理一样


**切记**
如果该项目中package.json文件中指定type值为module, 表明该项目中的所有js文件都遵循ESM的模块化规范，这些配置文件如果要用需要用js结尾的话，需要改为cjs结尾