import { DefaultTheme } from 'vitepress'
import { guideNav } from './lessons'
import { problemNav } from './problems'
import { toolsNav } from './tools'
export const navConfig = [
  {
    text: '学习指南',
    items: guideNav,
  },
  {
    text: '常见问题',
    items: problemNav,
  },
  {
    text: '工具列表',
    items: toolsNav,
  },
  { text: 'Changelog', link: 'https://github.com/qianduan-jiuci' },
] as DefaultTheme.NavItem[]
