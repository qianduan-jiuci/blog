import { DefaultTheme } from 'vitepress'

const optimiSide = {
  '/optimi/': [
    {
      link: '/optimi/index',
    },
    {
      text: '指标扩展',
      link: '/optimi/性能知识前言-指标计算',
    },
    {
      text: 'vite性能优化',
      link: '/optimi/vite',
    },
    {
      text: 'react性能优化',
      link: '/optimi/react',
    },
    {
      text: 'webpack性能优化',
      link: '/optimi/webpack',
    },
  ],
} as DefaultTheme.SidebarItem

export default optimiSide
