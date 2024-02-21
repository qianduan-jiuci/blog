import { DefaultTheme } from 'vitepress'
import { guideNav } from './lessons'
import { problemNav } from './problems'
import { toolsNav } from './tools'
import { viteProjectNav } from './viteProject'
import { reactProjectNav } from './reactProject'
import { engineeNav } from './enginee'
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
    text: '前端工程化',
    items: engineeNav,
  },
  {
    text: '工具列表',
    items: toolsNav,
  },
  {
    text: '设计模式',
    link: '/designPattern/',
  },
  {
    text: 'vite项目',
    items: viteProjectNav,
  },
  {
    text: 'react项目',
    items: reactProjectNav,
  },
  {
    text: '性能优化',
    link: '/optimi/',
  },
  { text: 'Changelog', link: 'https://github.com/qianduan-jiuci' },
] as DefaultTheme.NavItem[]
