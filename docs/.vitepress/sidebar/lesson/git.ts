import { DefaultTheme } from 'vitepress'

const GitSide = {
  '/lessons/git/': [
    {
      link: '/lessons/git/index',
    },
    {
      text: '版本控制',
      link: '/lessons/git/版本控制',
    },
    {
      text: '分支管理',
      link: '/lessons/git/分支管理',
    },
    {
      text: '技能进阶',
      link: '/lessons/git/技能提高',
    },
    {
      text: '项目托管',
      link: '/lessons/git/github托管项目',
    },
  ],
} as DefaultTheme.SidebarItem

export default GitSide
