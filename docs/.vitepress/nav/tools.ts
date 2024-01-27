import { DefaultTheme } from 'vitepress'
export const toolsNav = [
  {
    text: '第三方库集合',
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
      {
        text: '代码格式化',
        link: '/tools/format/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
