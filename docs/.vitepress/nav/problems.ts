import { DefaultTheme } from 'vitepress'
export const problemNav = [
  {
    text: 'vue相关生态',
    items: [
      {
        text: 'vitepress',
        link: '/problems/vitepress/',
      },
    ],
  },
  {
    text: 'Git',
    link: '/problems/git/',
  },
  {
    text: 'nestjs',
    items: [
      {
        text: 'prisma',
        link: '/problems/prisma/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
