import { DefaultTheme } from 'vitepress'

const formatSide = {
  '/tools/format/': [
    {
      link: '/tools/format/index',
    },
    {
      link: '/tools/format/eslint',
      text: 'eslint',
    },
    {
      link: '/tools/format/prettier',
      text: 'prettier',
    },
    {
      link: '/tools/format/tslint',
      text: 'tslint',
    },
    {
      link: '/tools/format/tslint-config-prettier',
      text: 'tslint-config-prettier',
    },
  ],
} as DefaultTheme.SidebarItem

export default formatSide
