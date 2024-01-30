import { text } from 'stream/consumers'
import { DefaultTheme } from 'vitepress'

const viteSide = {
  '/project/vite/': [
    {
      link: '/project/vite/common/index',
    },
    {
      text: '配置路径',
      link: '/project/vite/common/path',
    },
    {
      text: 'prettier格式化配置不生效',
      link: '/project/vite/common/prettier配置不生效',
    },
  ],
} as DefaultTheme.SidebarItem

export default viteSide
