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
  ],
} as DefaultTheme.SidebarItem

export default webpackSide
