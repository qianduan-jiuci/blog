import { DefaultTheme } from 'vitepress'

const tmuxSide = {
  '/tools/tmux/': [
    {
      link: '/tools/tmux/index',
    },
    {
      link: '/tools/tmux/快捷键',
      text: 'tmux 快捷键',
    },
    {
      link: '/tools/tmux/鼠标支持',
      text: 'tmux 鼠标支持',
    },
  ],
} as DefaultTheme.SidebarItem

export default tmuxSide
