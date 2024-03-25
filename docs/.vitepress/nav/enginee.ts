/*
 * @Author: lihaorun 954645392@qq.com
 * @Date: 2024-02-20 12:29:05
 * @LastEditors: lihaorun 954645392@qq.com
 * @LastEditTime: 2024-03-24 16:44:10
 * @FilePath: \vitepress\docs\.vitepress\nav\enginee.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { DefaultTheme } from 'vitepress'
export const engineeNav = [
  {
    text: '构建工具',
    items: [
      {
        text: 'webpack',
        link: '/package/webpack/',
      },
      {
        text: 'vite',
        link: '/package/vite/',
      },
    ],
  },
  {
    text: '网络请求库',
    items: [
      {
        text: 'axios',
        link: '/http/axios/',
      },
      {
        text: 'flyio',
        link: '/http/fly/',
      },
    ],
  },
  {
    text: 'css预处理器',
    items: [
      {
        text: 'sass',
        link: '/css/sass/',
      },
    ],
  },
] as DefaultTheme.NavItemChildren[]
