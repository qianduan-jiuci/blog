import { DefaultTheme } from 'vitepress'

const webpackSide = {
  '/package/webpack/': [
    {
      link: '/package/webpack/index',
    },
    {
      text: '基本配置',
      link: '/package/webpack/基本配置',
    },
    {
      text: '多入口打包',
      link: '/package/webpack/多入口打包',
    },
    {
      text: '代码抽离',
      link: '/package/webpack/代码抽离',
    },
  ],
} as DefaultTheme.SidebarItem

export default webpackSide
