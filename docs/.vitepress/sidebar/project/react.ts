import { text } from 'stream/consumers'
import { DefaultTheme } from 'vitepress'

const reactSide = {
  '/project/react/': [
    {
      link: '/project/react/common/index',
    },
    {
      text: '路径配置',
      link: '/project/react/common/path',
    },
  ],
} as DefaultTheme.SidebarItem

export default reactSide
