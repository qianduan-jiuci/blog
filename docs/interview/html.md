# html相应面试题

## 1. h5新增内容
- 语义化标签： header，footer，section，article，nav，audio，video、aside
- 表单新增类型： input["type"]
- 2d、3d： canvas， webgl
- 技术： websocket，web worker
- 事件： 拖拽事件
- 本地存储： localstorage、sessionStorage

## 2. href的各种用法
1. 用法一：普通链接（跳转页面）
2. 用法二：锚链接（本页面跳转）
3. 用法三：功能性链接（执行一段js|发送邮件|拨打电话）
````html
<a href="javascript:alert('执行js')"></a> <!--前缀必须是javascript: -->
<a href="mailto:邮箱地址"></a> <!--前缀必须是mailto: 要求电脑上必须要有一个邮箱软件-->
<a href="tel:电话号码"></a> <!--前缀必须是tel: 要求是手机或者电脑上装有拨号软件-->
````

## 3. 元素包含关系
以前：块级元素可以包含行级元素，行级元素不可以包含块级元素，a元素除外
现在：元素的包含关系由元素的内容类别决定
元素包含关系是由一篇相应的官方文档的，但是标准特别多，也不需要记忆，记下以下三个点就好了

1. 容器元素可以包含任意元素（div，article、section）
2. a元素可以包含大部分元素
3. 某些元素有固定的子元素（ul>li、ol>li、dl>dt+dd）

## 4. 可替换元素和非可替换元素

绝大多数页面展示的效果来源于内容：称为“非可替换元素”
少部分元素页面展示的结果来源于元素属性：称为“可替换元素”

可替换元素没有那么多：img、audio、video

绝大多数可替换元素均为行盒
可替换元素类似于行块盒，盒模型中所有尺寸均生效