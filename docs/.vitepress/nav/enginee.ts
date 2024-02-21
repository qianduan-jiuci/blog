import { DefaultTheme } from 'vitepress'
export const engineeNav = [
  {
    text: '构建工具',
    items: [
      {
        text: 'webpack',
        link: '/package/webpack/',
      },
      {
        text: 'vite',
        link: '/package/vite/',
      },
    ],
  },
  {
    text: '网络请求库',
    items: [
      {
        text: 'axios',
        link: '/http/axios/',
      },
      {
        text: 'flyio',
        link: '/http/fly/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
