import { DefaultTheme } from 'vitepress'
export const guideNav = [
  {
    text: '系统课程',
    items: [
      {
        text: 'Javascript',
        link: '/lessons/js/',
      },
      {
        text: 'Typescript',
        link: '/lessons/ts/',
      },
      {
        text: 'Vue',
        link: '/lessons/vue/',
      },
      {
        text: 'Git',
        link: '/lessons/git/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
