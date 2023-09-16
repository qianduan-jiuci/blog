import { DefaultTheme } from 'vitepress'
export const toolsNav = [
  {
    text: '模拟数据',
    items: [
      {
        text: 'mockjs',
        link: '/tools/mockjs/',
      },
      {
        text: 'JSON Server',
        link: '/tools/jsonServer/',
      },
      {
        text: 'tmux',
        link: '/tools/tmux/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
