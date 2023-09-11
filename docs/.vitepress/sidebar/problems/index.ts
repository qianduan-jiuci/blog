import { DefaultTheme } from 'vitepress'
import vitePressSide from './vitepress'
import GitSide from './git'
export default {
  ...vitePressSide,
  ...GitSide,
} as DefaultTheme.Sidebar
