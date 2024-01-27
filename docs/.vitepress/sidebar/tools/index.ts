import { DefaultTheme } from 'vitepress'
import mockjsSide from './mockjs'
import jsonServerSide from './jsonServer'
import tmuxSide from './tmux'
import formatSide from './format'
export default {
  ...mockjsSide,
  ...jsonServerSide,
  ...tmuxSide,
  ...formatSide,
} as DefaultTheme.Sidebar
