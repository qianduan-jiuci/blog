import { DefaultTheme } from 'vitepress'
import mockjsSide from './mockjs'
import jsonServerSide from './jsonServer'
import tmuxSide from './tmux'
export default {
  ...mockjsSide,
  ...jsonServerSide,
  ...tmuxSide,
} as DefaultTheme.Sidebar
