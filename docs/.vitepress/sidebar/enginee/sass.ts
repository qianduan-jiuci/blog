import { DefaultTheme } from 'vitepress'

const cssAside = {
  '/css/sass/': [
    {
      link: '/css/sass/index',
    },
    {
      text: '前言',
      link: '/css/sass/before',
    },
    {
      text: 'sass语法',
      link: '/css/sass/syntax',
    },
  ],
} as DefaultTheme.SidebarItem

export default cssAside
