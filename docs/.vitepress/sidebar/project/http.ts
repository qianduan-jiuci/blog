import { text } from 'stream/consumers'
import { DefaultTheme } from 'vitepress'

const HttpSide = {
  '/project/vite/': [
    {
      link: '/project/vite/http/index',
    },
    {
      text: 'axios',
      link: '/project/vite/http/axios',
    },
    {
      text: 'flyio',
      link: '/project/vite/http/fly',
    },
  ],
} as DefaultTheme.SidebarItem

export default HttpSide
