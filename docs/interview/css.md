# CSS面试题

在学习css的过程中，一定要弄明白两个问题：css属值的计算过程和视觉格式化模型
1. css属性值得计算过程(`所有得css属性从都没有值到都有值的过程`)通过以下四个步骤来确定最终得css属性值
   1. `确定声明值`
         声明值得来源有两个地方： `作者样式表和浏览器默认样式表`
         在这一步得目的是浏览器找出没有冲突的属性（有冲突的属性在这一步先不管）同时会把相对单位全部变成绝对单位
   2. `层叠`
         在这一步针对上述有冲突的属性进行比较，通过三个标准进行比较（1. 比较重要性 2. 比较特殊性 3. 比较源次序）
         <br />
          `重要性从高到低进行比较`<br />
              - 作者样式表中带有!important<br />
              - 浏览器默认样式表中带有!important<br />
              - 作者样式<br />
              - 默认样式<br />
           `比较特殊性`： 也就是平时所说的权重`四个数字：第一个是内联样式；第二个是id；第三个是属性选择器和类选择器的数量； 第四个是元素，伪元素等选择器`
           `比较源次序`： 源码中靠后的覆盖靠前的
   3. `继承`： 对仍然没有值的属性，若可以继承则使用继承，满足属性继承的属性在本文中的下方展示
   4. `使用默认值`
2. 视觉格式化模型
css中常说的盒模型其实只是规定了单个盒子的布局
页面中肯定不止生成一个盒子，`定义多个盒子的排列规则就是视觉格式化模型(布局规则)`
大体上将页面上的布局排列分为三种：
- 常规流
- 浮动
- 定位






## 1. css的盒子模型？
盒子模型有两种： 标准盒模型和怪异和模型
- 在标准盒模型中，一个元素的最终尺寸由内容宽高、边框、内边距，外边距组成的
- 怪异盒子模型中，也就是说：元素最终的尺寸等于定义的宽高+margin， 比如定义宽高是100*100的那么最终呈现的尺寸也是100*100的，如果有内边距和边框的话，会导致内容本身的宽高进行挤压

## 2. CSS中有哪些属性可以继承？
1. 字体系列：font、font-family、font-weight、font-size、font-style
2. 文本系列属性： 
     - 内联元素：color、line-height、word-spacing、letter-spacing、text-transform
     - 块级元素：text-indent、text-align
3. 元素可见性：visibility
4. 表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout
5. 列表布局属性：list-style


## 3. css中可以进行复合的属性？ 以及复合属性内部的顺序是什么？
1. font： font-style、font-weight、font-size|line-height font-family
2. background: background-color、background-image、background-repeat、background-position
3. transform: 具体最终的形状和书写的顺序有关，按照从后往前的执行顺序 rotate|translate|scale|skew
4. transition
5. animation
6. margin|padding top-right-bottom-left
7. border: border-width、border-style、border-color
## 4. Css的哪些属性可以导致元素会脱离文档流？
定位，浮动
## 5. css中的几种定位？
## 6. 如何清除浮动？
1. 触发BFC
2. clear：left|right|both（可以作用在父元素的伪元素内）
````css
.container::after {
  content: '';
  display: block;
  clear: both;
}
````
## 7. 对BFC(Block Formatting Context)的理解？
`视觉格式化模型包括块级格式化上下文，块级格式化上下文介绍了规定常规流块盒的布局规则`


它是一块独立的渲染区域，在这块区域内，规定了常规流块盒的布局



BFC的渲染规则：
- 常规流块盒在水平方向上，必须撑满包含块（margin +　padding + border + content = 包含块的宽度）
- 常规流块盒在垂直方向上，依次摆放
- 常规流块盒若外边距无缝相邻，则进行外边距的合并
- 常规流块盒的自动高度和摆放位置，都无视浮动元素和定位元素


总结：规则：`垂直排列+横向撑满+外边距合并+不计算浮动元素`


这些规则都是在一个区域中生效的，那么这个区域就是BFC创建的区域（块级格式化上下文）

块级格式化上下文产生的条件（如何创建BFC）：
1. 这个区域由某个HTML元素创建(`常见`)，以下元素会在其内部创建BFC:
    - 根元素：意味着body元素创建的BFC，覆盖整个网页所有的内容
    - 浮动元素和绝对定位元素
    - overflow不为visible的块盒（默认值为visible）
    - display的值为inline-block、table-cell、flex、inline-flex、table-caption

BFC的适用场景：
1. 防止因为浮动导致所在块高度坍塌（清除浮动）
2. 避免外边距折叠

扩展（格式化上下文还包含以下）：
- BFC（Block Formatting context）：块级格式化上下文
- FFC (Flex Formatting context) ： 自适应格式化上下文
- IFC (Inline Formatting context)：内联格式化上下文
- GFC (Grid Formatting context)： 网格布局格式化上下文


## 8. 对包含块（containing-block）
每个盒子都有它的包含块，它规定了在盒子内如何布局