import { DefaultTheme } from 'vitepress'

const TSSide = {
  '/lessons/ts/': [
    {
      link: '/lessons/ts/index',
    },
    {
      text: '入门',
      link: '/lessons/ts/入门',
    },
    {
      text: '断言',
      link: '/lessons/ts/断言',
    },
    {
      text: '类和接口',
      link: '/lessons/ts/类和接口',
    },
    {
      text: '泛型 Generics',
      link: '/lessons/ts/泛型-Generics',
    },
    {
      text: '装饰器 Decorations',
      link: '/lessons/ts/装饰器',
    },
    {
      text: '命名空间和模块化打包',
      link: '/lessons/ts/命名空间和模块化打包',
    },
    {
      text: 'webpack打包编译',
      link: '/lessons/ts/webpack打包编译',
    },
    {
      text: '类型工具',
      link: '/lessons/ts/类型工具',
    },
  ],
} as DefaultTheme.Sidebar

export default TSSide
