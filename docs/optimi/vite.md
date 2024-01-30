# Vite性能优化
性能优化不管是前端工程化中老生常谈的话题，不管是在实际项目中开发，还是作为找工作时的亮点，随着项目的体积越来越大，稍不注意就会产生明显的性能问题。在不同情景中，对于项目性能的关注点是不一样的。在项目开发阶段，我们只需要注重开发体验，注重项目构建性能；而在生产环境中，我们一般看重线上的实际运行时的性能。

对于开发阶段的构建性能问题，Vite内部已经做了很多相当多的优化，实现了`项目秒启动`和`零毫秒级热更新`。
本文主要针对线上环境的`项目加载性能优化`，与页面的 FCP(First Contentful Paint)、TTI 等指标。

注意：性能优化中的FP,FCP,FMP,DCL，LCP可以私下了解
## FP,FCP,FMP,DCL
### FP
FP：First Paint， 即渲染的第一个像素点，FP一般在HTML解析完成或者解析一部分的时候触发
FCP：First contentful Paint, 即渲染的第一个内容，这里的内容可以指文本、图片、canvas等等
FMP：First Meaningful Paint，首次渲染有意义的内容的时间，FMP定义的方式也很复杂。
LCP：largest contentful Paint， 最大内容渲染时间
