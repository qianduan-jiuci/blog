import { DefaultTheme } from 'vitepress'
/* 
生命周期： 
请求
中间件处理
守卫
拦截器
管道
相应
*/
const Nestjs = {
  '/lessons/nestjs/': [
    {
      link: '/lessons/nestjs/index',
    },
    {
      text: '前言',
      link: '/lessons/nestjs/前言',
    },
    {
      text: '提供者',
      link: '/lessons/nestjs/提供者',
    },
    {
      text: '模块',
      link: '/lessons/nestjs/模块',
    },
    {
      text: '项目基础配置',
      link: '/lessons/nestjs/项目基础配置',
    },
    {
      text: '数据库',
      link: '/lessons/nestjs/数据库',
    },
    {
      text: '控制器',
      link: '/lessons/nestjs/控制器',
    },
    {
      text: '管道',
      link: '/lessons/nestjs/管道',
    },
    {
      text: '表单验证',
      link: '/lessons/nestjs/表单验证',
    },
    {
      text: '鉴权',
      link: '/lessons/nestjs/鉴权',
    },
    {
      text: '拦截器',
      link: '/lessons/nestjs/拦截器',
    },
    {
      text: '文件上传',
      link: '/lessons/nestjs/文件上传',
    },
    {
      text: '静态托管',
      link: '/lessons/nestjs/静态托管',
    },
    {
      text: 'CORS',
      link: '/lessons/nestjs/CORS',
    },
    {
      text: '异常过滤器',
      link: '/lessons/nestjs/异常过滤器',
    },
    {
      text: '高速缓存',
      link: '/lessons/nestjs/高速缓存',
    },
    {
      text: '限流',
      link: '/lessons/nestjs/限流',
    },
    {
      text: '策略授权',
      link: '/lessons/nestjs/策略授权',
    },
    {
      text: '宝塔配置',
      link: '/lessons/nestjs/宝塔配置',
    },
    {
      text: '常用扩展包',
      link: '/lessons/nestjs/常用扩展包',
    },
  ],
} as DefaultTheme.SidebarItem

export default Nestjs
