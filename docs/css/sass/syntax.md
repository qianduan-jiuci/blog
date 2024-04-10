# sass语法



## 1. sass中的使用

sass中共有三种使用方法：在命令行工具中使用；作为独立的Ruby模块；作为 Rack-enabled 框架的插件（例如 Ruby on Rails 与 Merb



sass --version：查看版本

sass -i：执行sass代码

sass style.scss:style.css --watch: 将style的scss文件编译后style的css文件，并监听文件的改变










## 2. sass和scss选择

其实sass和scss是一个东西
Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于Sass。说白了Scss就是Sass的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。另外，SCSS 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法


sass和scss的不同点：
1. 书写方式不同，sass是按照严格的缩进规则来进行书写，不带大括号和分号，而scss的书写语法和css语法书写更为相似
2. 扩展名不同，sass是以.sass结尾， scss是以.scss结尾


````sass
.container 
  width: 100px
  height: 100px
  border: 1px solid #fff
  margin: 10
  padding: 10

.container .wrap 
  width: 50%
  height: 50%
  background: cyan url(xxxx) no-repeat top left 
````

````scss
.container {
  width: 100px;
  height: 100px;
  border: 1px solid #fff;
  margin: 10;
  padding: 10;
}
.container .wrap {
  width: 50%;
  height: 50%;
  background: cyan url(xxxx) no-repeat top left;
}
````


## 3. 变量
在sass中定义一个变量用$开头，比如要声明一个全局背景和一个全局字体颜色
````scss
/* 全局背景，亮色背景对应黑色字体，暗色背景对应白色字体 */
$globalBackground:#fff;
$globalFontColor:#000;



.container {
  color: $globalFontColor;
  background-color: $globalBackground;
  text: 20px;
}
````


## 4. 嵌套

在css中，书写样式是不允许按照嵌套来书写的，但是在css的预编译器中，可以按照嵌套的规则来书写， 同时在被编译之后，嵌套关系也会在css中表现出来，也会增加样式的特殊性（权重）
````sass
.container 
  width: 100px
  height: 100px
  border: 1px solid #fff
  margin: 10
  padding: 10

  .wrap 
    width: 50%
    height: 50%
    background: cyan url(xxxx) no-repeat top left 

````
再sass中不止只有选择器的嵌套，还可以对属性进行嵌套，比如当我们写一些复合属性的时候，由于这些属性本身的前半段部分就是重复的
所以可以使用这个属性的嵌套

````scss
.wrap {
  font-family: "微软雅黑","Arial", "Helvetica";
  font-size: 16px;
  font-weight: bold:
  font-style: italic;
}
.nav {
  border: 1px solid #fff;
  border-left: 2px;
  border-right: 2px;
}


// 使用scss中的属性嵌套
.wrap {
  font: {
    family: "微软雅黑","Arial","Helvetica";
    size: 16px;
    weight: bold;
    style: italic;
  }
}

.nav {
  border: 1px solid #fff {
    left: 2px;
    right: 2px;
  };
}

````



## 5. Mixin混入
在sass中使用混入可以完成css逻辑的封装，混入的概念和vue2中的混入概念一样，就是把一块公共的代码进行抽离出来，然后再指定的地方使用
sass中的混入需要使用@mixin关键字来声明，再进行使用的时候，要用@include 来进行引用



格式如下：
````scss
@mixin mixinName (参数一，参数二，参数三, ...) {
  ...
}

.select {
  @include mixinName(参数一，参数二，参数三，...)
}
````

需要注意，混合这里面的参数名称要符合scss的规则（变量要以$开头）



````scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style:none;
}

nav ul {
  @include reset-list;
}

@mixin alert($color,$bgColor) {
  color: $color;
  background-color: $bgColor;
}


.alert-warning {
  @include alert(#fff,cyan);
}
````


在这种模式下书写的scss样式，在使用混入的时候，必须要严格按照书写时候的顺序来，如果不想按照声明时候的顺序，则可以再include使用的时候，直接按照命名传参的方式来
````scss

@mixin alert($color,$bgColor) {
  color: $color;
  background-color: $bgColor;
}


.alert-warning {
  @include alert($bgColor:cyan,$color:#fff);
}
````


## 6. 继承(@extend)
在scss中，可以通过继承的方式来减少书写的代码

他的功能是可以让一个选择器继承另外一个选择器的所有样式



````scss
.alert {
  padding: 15px;
}

.alert-info {
  @extend .alert;
  margin: 15px;
}
````

因为这是一个继承指令，当scss解析成css之后，会将继承的这个选择器和源选择器用到一个群组选择题
````css
.alert,.alert-info {
  padding:15px;
}
.alert-info {
  margin: 15px;
}
````







注意： `如果继承了一个属性，那么也会继承该属性的所有子选择器`。





比如现在有一个alert的类选择器，同时alert类选择器还有后代选择器.alert a，如果在另一个选择器中继承了alert这个类选择器，那么也会继承.alert a选择器


````scss
.alert {
  padding: 15px;
}

.alert a {
  font-size: 20px;
}

.alert-info {
  @extend .alert;
  margin: 15px;
}
````


````css
.alert,.alert-info {
  padding:15px;
}

.alert a, .alert-info a {
  font-size: 20px;
}


.alert-info {
  margin: 15px;
}


````





那么什么时候需要使用继承呢？

````css
.tip {
    margin: 1em 0;
    font-size: 0.8em;
    opacity: 0.8;
    text-decoration: underline;
}
.tip-warning {
    margin: 1em 0;
    font-size: 0.8em;
    opacity: 0.8;
    text-decoration: underline;
    color: orange;
}
.tip-error {
    margin: 1em 0;
    font-size: 0.8em;
    opacity: 0.8;
    text-decoration: underline;
    color: red;
}
````



就观察这么一种特点：看这些选择器之间的关系（这是一些关于消息的选择器）警告是不是消息的一种，错误是不是也是消息的一种，就跟小狗是动物的一类，柯基也是小狗的其中一类。



当我们可以使用这样的关系来描述一个对象关系的时候，在面向对象的领域里面，就可以用继承关系，对比到css也是一样的道理。当我们观察到其中的某些样式，是其中一个样式的某种特殊情况的时候，他们就会存在一个这样的继承关系。只是在纯css中，无法用语法来表达这个继承关系，但是在sass中是可以的。使用@extend



````scss
.tip {
    margin: 1em 0;
    font-size: 0.8em;
    opacity: 0.8;
    text-decoration: underline;
}
.tip-warning {
    @extend .tip;
    color: orange;
}
.tip-error {
 	@extend .tip;
    color: red;
}
````



这样的话，在最终编译的结果里面，会将使用继承的样式进行一个联合。

````css
.tip,.tip-warning,.tip-error {
    margin: 1em 0;
    font-size: 0.8em;
    opacity: 0.8;
    text-decoration: underline;
}

.tip-warning {
    color: orange;
}

.tip-error {
    color: red;
}
````



对于这种情况，完全也可以使用混合来完成，但是会导致编译后文件的体积变大，而使用继承之后，有效降低了编译过后文件的体积。





## 7. partials和@import

在css中，本身存在一个@import关键字`@import url("XXXXXX.css")`，通过这个关键字可以在一个css文件中导入两外一个css文件

只不过在css中，每次使用@import，都会导致网络请求这个css文件并下载。每次HTTP的请求，都会消耗服务器的资源。



scss扩展了@import的功能，保留css中@import的功能`@import url("XXXXX.css")`。 

### css模块化

css也是有模块化的，只是css的模块化是运行时态的，而scss的模块化是编译时态的。 

````css
@import url("XXXXX.com"); /*css的模块化是运行时态的，不参与编译，并且会在运行的时候通过http下载该文件*/
````

scss的@import不止支持运行时态的`@import url("xxxx.css")`还支持编译时态的`@import "xxxxx.css"`

当scss使用了编译时态的模块化，在经过编译过后，scss会将该模块添加到css文件中。

````scss
// a.scss
body {
    margin:0;
    padding:0;
    list-style: none;
}
a {
 	text-decoration:none; 
}
````

````scss
// b.scss
@import "./a";
.wrap {
    width:100px;
    height: 100px;
} 
````

编译过后的文件

````css
body {
    margin:0;
    padding:0;
    list-style: none;
}
a {
 	text-decoration:none; 
}
.wrap {
    width:100px;
    height: 100px;
} 
````

由此可以看出并不会发出网络请求，同时还是编译时态。

使用这种scss扩展的@import这种模块化，本质上是存在问题的

- 混淆：scss的@import和css的@import使用同一个关键字，其区别就是有没有url，同一个关键字极易混淆，从语言设计的角度来说不好。
- 污染：在开发过程中会抽离很多的scss模块，不同的scss模块可能会定义不同的scss变量，这些变量就极易导致命名冲突

````scss
// a.scss
$color: #fff;
````

````scss
// b.scss
$color: cyan;
````

````scss
@import "./a";
@import './b';
body {
    color: $color
}
````

这就造成了污染的问题，命名冲突造成的问题，在开发过程中甚至不会报错，这就会把问题遗留到运行时态。

- 私有：scss没有私有的变量，他所有的变量都可以从外部进行访问，不像在js中，如果外部想要使用内部模块的变量，那么内部模块需要导出，外部模块需要导入，scss没有私有的变量，比如现在有一个mixin，直到导入这个scss文件，那么就可以直接使用这个mixin



基于这三个主要问题以及一些边角料的问题，scss官方已经不建议使用@import来实现css编译时态的模块化了。

如果说需要编译时态的模块化，那么建议使用@use





### @use



@use解决了上述中@import出现的问题，同时官方已经有相关文档说明：可能在未来几年之内会删除@import这个指令



1. `混淆问题解决`：@import是css中的指令，而@use是scss中的模块化指令，就不存在混淆的问题。

2. `污染问题解决`：`使用@use导入的模块，是有命名空间的`，通过命名空间才能访问到模块内部的变量，不管该scss模块嵌套的层级有多深，该模块的文件名就是该模块的命名空间。

````scss
// common.scss
$color:#f02;
$bg-color:lightblue;
````

````scss
// base.scss
$color:#f00;
$bg-color:darkblue;
````

````scss
// global.scss
@use './common.scss';
@use './base.scss';

body {
    backgrounod-color:common.$bg-color;
    color:base.$color;
}
````

当使用了@use这种模块化指令之后，即使不同的文件之间存在再多的变量命名的冲突，有了命名空间，就能很大程度的解决了污染的问题。但是问题没有完全解决，看下面的代码：

````scss
// ./common.scss
$color:#f02;
$bg-color:lightblue;
````

````scss
// ./base/common.scss
$color:#f00;
$bg-color:darkblue;
````

````scss
// global.scss
@use './common.scss';
@use './base/common.scss';

body {
    backgrounod-color:?;
    color:?;
}
````

如果是这种情况，不是说命名空间是文件的名称吗，那么这两个文件的名称都是common，也就是说两个命名空间都是common

既然这样，该怎样去使用这两个模块内部的变量呢？这样就会导致冲突了呀，还是没有解决污染的问题？



解决办法：scss早都考虑到有这种情况，所以scss提供了`自定义命名空间`

`在使用@use进行导入的时候，提供 as 关键字来修改该模块的命名空间`

````scss
// global.scss
@use './common.scss' as common;
@use './base/common.scss' as base;

body {
   	backgrounod-color:common.$bg-color;
    color:base.$color;
}
````

自定义命名空间取值可以取为`*`，但是如果这样的话，就和@import一样了，那就没有任何命名空间了，还是会存在污染的问题。`十分不建议这样写`





3. `私有变量问题解决`：把变量变为模块内部私有的变量，给变量加一个`横杠-`或者`下划线(_)`，通过命名来进行约束，本身这种下划线的这种命名规范就是表示内部私有的，前端里面基本上是约定俗成的命名规范了。通过这个约定来完成私有变量的定义。并且在模块外去使用模块内部的变量的时候，会进行报错`Undefine Variable`









### partials部分

​	它可以让我们在一个scss文件里面去导入另外的scss文件，scss会把他们编译到一个css文件，这样呢，就可以把一个项目中的css文件，分割成很多小的scss部分，这些小的部分就是partials，在scss中，会以一个下划线开头，这样呢，scss就会知道这些partials都是一个scss小的一部分，他就不会去进行额外的http请求。同时在进行导入的时候，可以省略掉前面的_

partials文件：_base.scss 

````scss
.alert {
	margin:0;
    padding:0;
}
````

外部文件common.scss，引入_base文件

````scss
@import "base";
````



## 8. 注释

scss中的注释可以分为单行注释，多行注释，强制注释

区别就是不同类型的注释，最终在编译的时候结果不同

- 单行注释，只会在原本文件中展现，不会再最终的编译结果中出现
- 多行注释，会包含在没有压缩的css文件中，如果压缩过后，多行注释也不会存在
- 强制注释，会在编译前后保持固有的格式，编译和压缩都会保留
- 文档注释， 在scss中用///表示

````scss
// 单行注释
 /*
  * 多行注释
  */

/*！
  * 强制注释
  */


/// 文档注释
````



## 9. 数据类型 data type

sass共分为七种数据类型

- 数字： 1， 2， 5px
- 字符串： 有引号字符串和无引号字符串， "bar", bar
- 颜色：blue，#ff0， rgb(255,255,255)， hsl(270，80%， 80%)
- 布尔值： true， false
- 空值： null
- 数组：list，用空格或者逗号作为分割符，1px solid #000, Arial, sans-serif, 微软雅黑
- map，相当于对象的object， （key： value1， key2： value2）



### 1. null

`null` 是 **Sass** 中最基本的数据类型，表示空值。它既不是 `true` 也不是 `false`，而是表示没有值。请注意，即使是一个不存在的变量或字母，也不会被视为空。因此，`NULL` 或 `Null` 实际上都是 `null`，它们都是字符串。尽管 `null` 表示没有值，但使用 `length(..)` 函数时，仍会返回长度为 1。这是因为 `null` 仍然表示一个实际存在的实体，只是它不代表任何具体的内容。同样，你不能将 `null` 与其他字符串连接，否则在编译 **Sass** 时会报错。





### 2. string

字符串在 **CSS** 中常用于字体样式等属性。在 **Sass** 中，字符串可以用引号，也可以不用引号。例如：



```scss
$website: 'SitePoint'; // 存储 SitePoint
$name: 'Gajendar' + ' Singh'; // 'Gajendar Singh'
$date: 'Month/Year : ' + 3/2016; // 'Month/Year : 3/2016'
$just-string: '3/2016'; // '3/2016'
```

在字符串操作的时候，可以利用加号来进行字符串的拼接，同样也可以用减号来完成字符串的拼接，此时减号作为字符串的连接符



### 3. color

颜色可以通过十六进制表示或名称引用，例如 `blue` 或 `#04a3f9`。也可以从函数返回，例如 `rgb(107, 113, 127)` 或 `hsl(210, 100%, 20%)`

### 4. number

数字在 **CSS** 中广泛使用，大多数都与单位一起使用。在 **Sass** 中，也有数字类型。你可以进行基本的数学运算。请注意，只要操作数字和兼容的单位，都是有效的。

````scss
 2 + 9 // 11
 9 - 2 // 7
 9 * 2 // 18
 8 / 2 // 8/2 这是因为在css中有些属性会用到这种/比如font：16px/1.5， 如果想进行数学运算的话，可以包裹括号
 (8 / 2) // 4

// 同时scss还带有单位的数学运算
5px + 5px = 10px
5px - 2 = 3px
5px * 2 = 10px
5px * 2px = 10px*px // 需要注意在带有单位运算的时候，会把单位也进行计算，尤其是在乘除的时候，严格注意好
(10px / 2px) = 5 // 单位抵消
(10px / 2) = 5px
````







### 5. boolean

这个数据类型只有两个值：`true` 和 `false`。在 **Sass** 中，只有自身是 `false` 和 `null` 才会返回 `false`，其他一切都将返回 `true`。例如：

````scss
$i-am-true: true;
$a-number: 2;

body {
    @if not $i-am-true {
        background: rgba(255, 0, 0, 0.6); // 蓝色背景
    } @else {
        background: rgba(0, 0, 255, 0.6); // 预期的红色背景
    }
}

.warn {
    @if not $a-number {
        color: white;
        font-weight: bold;
        font-size: 1.5em;
    } @else {
        display: none; // 预期的不显示
    }
}

````





### 6. list

值列表用空格或逗号隔开，可以用方括号 `[]` 括起，例如 `1.5em 1em 0 2em`，`Helvetica, Arial, sans-serif`，或是 `[col1-start]`



### 7. map

键值对映射，用圆括号括起，例如 `(background: red, foreground: pink)`。





````scss
type-of(1px) // number
type-of(1) // number
type-of(hello) // string
type-of("hello") // string
type-of(null) // null
length(null)  // 1
type-of(true) // bool
type-of(1px solid #fff) // list
type-of([1px,solid,#fff]) // list
type-of((background:#fff, textColor:cyan)) // map
````





## 10. 函数

通过调用函数，会返回一个处理过后的值

在新版本的sass里面，不建议直接使用这样的全局函数，全局函数有可能在将来会被移除掉。

像这些相关的函数，比如颜色函数，字符串函数，数学函数，这些它都放置到了各自的模块中（内置模块），就有点类似于js的模块化开发

就比如node环境里面，路径相关的函数在path模块，文件操作的函数在fs模块，网络请求相关的在http模块

要使用这些函数，需要导入内置模块

- 数学函数：@use "sass:math";
- 颜色函数：@use "sass:color";

导入内置模块之后，要访问函数要通过命名空间的方式进行导入：

````scss
@use "sass:math";
@use "sas:color";
math.sin();
math.cos();

color:adjust-hue();
color:opacity()
````







### 1. 数字函数

- abs(): 返回一个数字的绝对值

- round(): 返回一个数字取整过后的值， 依托于四舍五入

- ceil()：返回一个数字进位后的数字，也就是ceil(3.1)为4， ceil(3.9)也为四

- floor()： 返回一个数字退位的数字，也就是floor(3.1)为3， floor(3.9)也为3

- percentage()：返回一个百分数的数字，将一个数字转化为百分数，percentage(650px / 1000px)为65%

- min()/max()： 返回数字列表中最小/最大的值





### 2. 字符串函数

- to-upper-case(str)：将一个字符串全部变为大写

- to-lower-case(str)：将一个字符串全部变为小写

- str-length(str)： 获取字符串的长度

- str-index(str, subsetStr)： 用于获取某段字符在该字符串中出现的位置（这里的索引值从1开始）

- str-insert(str, newStr, index)： 用于在该字符串中插入新的字符， 和js中的substring类似



### 3. 颜色

在css中用于表示颜色的方式有很多，比如使用预设，或者使用三原色表示法，又或者是使用色相环表示法

cyan | orange | lightblue | red | green | blue 

rgb(217,129,159) |  #ff2457

hsl(270, 80%, 50%)：色相值，饱和度，亮度

在scss中表示颜色的方式有很多，同时还提供了很多的颜色相关的函数



- adjust-hue(color，value)： 用于调整hsl表示的颜色值中的hue属性

- saturate()和desaturate()： 用于调整hsl中的第二个属性，饱和度

- lighten和darken()： 用于调整hsl中的第三个属性，lighten用于增大原来颜色的明度，而darken用于增大原来颜色的暗度

- opacity和transparentize：用于调整alpha通道中的透明度，opacity()用于表示增加的透明度，transparentive用于表示增加的不透明度(减少的透明度)





### 4. 列表

在scss中的列表用空格或者逗号来分割，也可以用【】包括，也可以选择不包裹

在编译过css之后，css本身不存在列表，列表和其他编程语言中的数组比较相似

使用@each来遍历列表。





- nth(): 用来获取列表中的值

- length()：用来获取列表的长度，注意scss中的索引是从1开始的

- index()：获取列表中的具体项目的索引值

- append()；向列表中添加新的项目。

- join()： 将多个列表合并成一个列表。同时可以在最后一个参数中设置新字符串的间隔符号，如果是space是空格，如果是comma则是逗号

### 5. map



map类型的数据为一个键值对

````scss
$map: (key1:value1, key2:value2, key3:value3, key4:value4)
````



- length()： 用于获得map类型的数据长度

- map-get():  用于获取集合中的键所对应的值

- map-keys()： 用于获取集合中的所有的key

- map-values()： 用于获取集合中的所有value
- map-has-key()： 用于判断集合中是否存在一个key
- map-merge()： 用于将多个集合合并为一个集合
- map-remove()：用于在集合中移除一个或者多个项目，返回一个移除过后的map







##  11. 逻辑运算符

与或非，返回一个布尔值，这一点和js不太一样，js的逻辑运算符返回最后一个操作的值( && || ！)

使用and表示与 

使用or表示或

使用not表示非



## 12. 插值表达式

在scss中可以将一个表达式插入到一个字符串中，这种就类似于es6中的模板字符串中如何使用表达式${}

使用`#{var}`的形式

使用`#{express}`

````scss
$info: "info";
$border："border";
.aler-#{$info} {
    #{$border}-width: 1px;
	#{$border}-style:　solid;
	#{$border}-color: #000;
}
````





## 13. 控制指令

在定义复杂的mixin或者定义复杂的funciton的时候，可以内部需要使用一些控制指令

通常使用@if、@else来进行条件的判断

通常使用@for、@while、@each来进行循环的执行



### 1. @if、@else

````scss
@if 条件{
    
}
````

````scss
$use-prefixes: false;

.round {
    @if $use-prefixes {
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
	}
    @else border-radius: 5px;
}
````





### 2.  @for 和 @while



#### @for

格式：

````scss
@for $var from <开始值> through <结束值> {
    ...
}
````

````scss
@for $var from <起始值> to <结束值> {
    ...
}
````

例如：

````scss
$columns: 4;
@for $i from 1 through $columns {
    .li-#{$i} {
        width: 100% / $columns * $i; // 25% 50% 75% 100%
    }
}

@for $i from 1 to $columns {
    .wrap-#{$i} {
        width: 100% / $columns * $i; // 25% 50% 75%
    }
}
````

这两种的区别在于第二种并不会将最后一个变量参与循环

就类似于js的`for(let i = 1 ; i < 4; i++){}`

而第一种就类似于js的`for(let i = 1 ; i <= 4; i++){}`







#### @while

格式：

````scss
@while <终止条件> {
    
}
````



### 4. @each

@each用来遍历集合或者列表

````scss
// 遍历集合对象

@each $keys, $values in theme-map {
    ...
}

// 遍历列表
@each $listValue in lists {
    
}
````

当@each作用到集合的时候，可以将第一个参数作用为key，第二个参数作为value，类似于对象的解构

@each作用到列表的时候，第一个参数为value



例如：当我们使用字体图标的时候，需要很多伪元素

````css
.fa-glass:before {
  content: "\f000";
}
.fa-music:before {
  content: "\f001";
}
.fa-search:before {
  content: "\f002";
}
.fa-envelope-o:before {
  content: "\f003";
}
.fa-heart:before {
  content: "\f004";
}

````

这种好麻烦，每次都要写一样的东西，很繁琐，可以利用@each实现循环

````scss
$ttfIconMap: (
  glass: "\f000",
  music: "\f001",
  search: "\f002",
  envelope: "\f003",
  heart: "\f004",
);

@each $name,$content in $ttfIconMap {
  .fa-#{$name}:before {
    content: #{$content}
  }
};
````



尤其是当你有几十个或上百个字体图标的时候，在使用了这种的方式的时候，只需要修改map





实例：使用@while和@for以及对于@each对于同种场景下的不同使用：

````scss

$dark-bg-color: black;
$dark-color: white;
$light-bg-color: white;
$light-color: black;


$bg-map: (
	dark:(
    bg-color:$dark-bg-color,  
    text-color:$dark-color
  ),
 light:(
    bg-color:$light-bg-color,
    text-color:$light-color
  ),
);
    
// 使用@each遍历
$current-theme: dark;
@mixin get-global-theme {
  @each $theme,$values in $bg-map {
    $current-theme: $theme !global;
    html[data-theme="#{$theme}"] & {
      @content;
     }
  }
};

// 使用@while进行遍历
@mixin get-global-theme {
  $length: length($bg-map);
  $current_index:1;
  @while $current_index <= $length {
    $keys:map-keys($map: $bg-map);
    $current_item_key:nth($list: $keys, $n: $current_index);
    $current_item_value: map-get($map: $bg-map, $key: $current_item_key);
    $current-theme: $current_item_key !global;
    html[data-theme="#{$current_item_key}"] & {
      @content;
     }
    $current_index:$current_index+1 ;
  }
};

@function get-var($prop) {
  $themeOptions: map-get($bg-map,$current-theme);
  @return map-get($themeOptions ,  $prop)
}


.item {
  width: 100px;
  height: 100px;
  @include get-global-theme{
    background-color: get-var("bg-color");
    color: get-var("text-color");
  };
}
````





## 14. &

使用&来获取当前作用的选择器

````scss
.item {
    width: 100px;
    height: 100px;
    & .wrap{
        width: 50%;
        height: 50%;
    }
}
````

当然也可以在@mixin中使用&来获取当前混合作用到的那个选择器

````scss
@mixin get-theme {
    html[data-theme="dark"] & {
        ......
    }
}
````



## 15. @content

@content用于在mixin中获取到由使用者传递的属性，类似于vue中的插槽，而@content就是用来获取插槽内容

scss中的在mixin的后面用{}包裹，表现形式如下：

````scss

@mixin get-theme() {
    @content;
};

.item {
    @include get-theme{
        background-color: getVar('bg-color');
        color: getVar("text-color");
    };
};
````

这里面的`background-color: getVar("bg-color"); color: getVar("text-color")`就是插槽，在混合使用@content来接受







## 16. @function和@return

使用@function就一定要有@return

注意： @function只能作用到属性上面，用来获取属性的属性值

````scss
@function getVar($property) {
    @return map-get($theme-map, $property);
};


.item {
    @include get-theme{
        background-color: getVar('bg-color');
        color: getVar("text-color");
    };
}
````





## 17. @debug





## 18. !global

在scss中声明一个全局变量，如果在内部作用域使用这个变量进行赋值的时候，存在一个全局变量和局部变量的问题

````scss
$current-theme: "dark";

@mixin get-theme() {
    $current-theme="light"; // 这里修改了全局变量并不会影响到该变量
}
````

类似于js的这样

````js
let currentTheme="dark";
function getTheme() {
    let currentTheme="light"; //此时函数内部的currentTheme和外部的变量具有不同的词法环境，不会影响到全局
}
````

为了解决这个问题，可以使用!global



````scss
$current-theme: "dark";

@mixin get-theme() {
    $current-theme="light" !global; // 这里全局变量$current-theme已经被修改成"light"了
}
````

## 19. @warn 和 @error @debug

这两种指令用于在scss中展示问题

````scss
$colors:(light:#fff,dark:#000);

@functioin getVar($key) {
    @if not map-has-key($colors,$key) {
  		@warn "this property is not in map";
     	@error "this property #{$key} is not in map";
        
    }
    @return map-get($colors,$key);
};


body {
    background-color:getVar(light);
}
````

通过 `@debug <expression>` 可以很方便地在控制台打印出表达式返回的值。

```scss
@debug "1 + 1 = #{1 + 1}"; // 1 + 1 = 2
```







## 20. 实例

### 示例一：通过sass简化媒体查询

````css
.header {
  display: flex;
  width: 100%;
}

@media (min-width:320px) and (max-width: 480px) {
   .header {
    height: 50px;
   }
}


@media (min-width:481px) and (max-width: 768px) {
  .header {
   height: 60px;
  }
}


@media (min-width:769px) and (max-width: 1025px) {
  .header {
   height: 70px;
  }
}


@media (min-width:1025px) and (max-width: 1200px) {
  .header {
   height: 80px;
  }
}

@media (min-width:1201px)  {
  .header {
   height: 90px;
  }
}
````

这是使用css来实现的媒体查询代码，这还只是一个header的媒体查询，如果要做成一个网站，那他的媒体查询可是很夸张的，而且后期进行代码维护也很恶心。

接下来就用sass来进行简化

````scss
$pbmaps: (
  'phone': (320px, 480px),
  "pad": (481px, 768px),
  "notepad": (769px, 1024px),
  "desktop": (1025px, 1200px),
  "tv": 1201px
);


@mixin responseTo($pointbreakName) {
  $bp:map-get($pbmaps,$pointbreakName);
  @if type-of($bp) == 'list' {
    $min: nth($bp,1);
    $max: nth($bp, 2);
    @media (min-width: $min) and (max-width:  $max) {
      @content;
   }
  }@else {
    @media (min-width:$bp)  {
      @content;
   }
  }
};

.header {
  display: flex;
  width: 100%;
  @include responseTo('phone') {
    height: 50px;
  };
  @include responseTo('pad') {
    height: 60px;
  };
}
````

当然也可以利用sass的模块化，将这个map和mixin提取到模块内部，然后在使用的时候，只需要导入进来即可

利用sass，如果说以后需要对屏幕的断点有了变化，那么只需要修改这个map对象即可。



利用模块化将混合和map对象提取。

````scss
// media.scss 媒体查询的scss文件
@use "./common/mediamixin.scss" as media;

.header {
  display: flex;
  width: 100%;
  @include media.responseTo('phone') {
    height: 50px;
  };
  @include media.responseTo('pad') {
    height: 60px;
  };
}

````

````scss
/// common/mediamixin.scss文件，用_声明的pbmaps是该文件的内部变量，外部无法访问

$_pbmaps: (
  'phone': (320px, 480px),
  "pad": (481px, 768px),
  "notepad": (769px, 1024px),
  "desktop": (1025px, 1200px),
  "tv": 1201px
);


@mixin responseTo($pointbreakName) {
  $bp:map-get($_pbmaps,$pointbreakName);
  @if type-of($bp) == 'list' {
    $min: nth($bp,1);
    $max: nth($bp, 2);
    @media (min-width: $min) and (max-width:  $max) {
      @content;
   }
  }@else {
    @media (min-width:$bp)  {
      @content;
   }
  }
};
````









### 示例二：通过sass实现星空效果









## 21. 工程化处理

### 1. 注入全局变量

在某些情况下，会将一些变量提取到一个文件中，然后再需要使用变量的时候进行导入，但是每个SFC中都需要导入，这就比较繁琐了，这就需要我们再每个文件自动导入这个scss文件





再webpack中，因为webpack不能处理css文件，需要使用各种loader

再进行全局变量注入的时候，需要去查找相应的loader： sass-loader

再sass-loader中进行配置additionalData选项导入

````js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use '~/assets/scss/variable' as *;`,
            },
          },
        ],
      },
    ],
  },
};
````

通过这样配置，会在每个使用scss的文件中，都导入这么一句话`@use "~/assets/scss/variable" as * ;`

然后就可以使用内部的变量





vite因为内置了对所有资源的处理，所以，vite中没有loader的概念，但是vite会暴露出css这个属性，通过这个属性，就可以进行一些关于预处理器的配置，然后还是在additionalData中进行配置

````js
export default defintConfig(({command,mode})=>{
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use '~/assets/scss/variable' as *;`,
        },
      },
    },
})
````

效果和上述的效果一样。
