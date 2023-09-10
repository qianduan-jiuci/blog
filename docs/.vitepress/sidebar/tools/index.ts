import { DefaultTheme } from 'vitepress'
import mockjsSide from './mockjs'
import jsonServerSide from './jsonServer'
export default {
  ...mockjsSide,
  ...jsonServerSide,
} as DefaultTheme.Sidebar
