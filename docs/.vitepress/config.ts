import { defineConfig } from 'vitepress'
import { navConfig } from './nav'
import { sidebar } from './sidebar'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '九辞',
  description: '那个曾经的少年回来了',
  lastUpdated: true,
  head: [
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer',
      },
    ],
  ],
  themeConfig: {
    nav: navConfig,
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
})
