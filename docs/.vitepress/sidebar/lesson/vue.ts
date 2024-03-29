import { DefaultTheme } from 'vitepress'

const VueSide = {
  '/lessons/vue/': [
    {
      link: '/lessons/vue/index',
    },
    {
      text: 'vue3.3.x',
      link: '/lessons/vue/vue3.3',
    },
    {
      text: '响应式语法糖',
      link: '/lessons/vue/vueSugar',
    },
    {
      text: 'TypeScript工具类型',
      link: '/lessons/vue/typescript工具类型',
    },
  ],
} as DefaultTheme.SidebarItem

export default VueSide
