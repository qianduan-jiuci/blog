# vue面试题

## 01.什么是Vue的响应式？

`vue数据响应式设计的初衷是为了实现数据和函数的联动`，当数据发生变化后，该数据的联动函数将会自动运行。

具体在vue的开发中，数据和组件的render函数关联在一起，从而实现了数据变化自动运行render，在感官上就看到了组件的重新渲染。

除了vue自动关联的render函数，其他还有很多适用到vue响应式的场景，比如computed、watch等等，不能仅吧vue的数据响应式想象成和render的关联 


## 02.Vue2和Vue3响应式的区别？
Vue2和Vue3响应式的区别，可以理解为Proxy和Object.defineProperty的区别，针对于这两个技术的区别，在js的面试题中提到过了

Proxy拦截对象的所有基本操作，而Object.defineProperty只是众多基本操作中其中一个

既然Vue2中无法拦截数组，当这个数组是个响应式数据的时候，如何实现的响应式?
`vue2中使用的Object.defineProperty无法监听到数组的变化，从而vue2直接改写了数组原型上的方法，其实看着是调用的`push`、`shift`、`unshift`等方法，其实是调用了改写过后的数组方法`
vue3就不需要了，vue3可以拦截整个数组
