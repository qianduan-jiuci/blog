import { DefaultTheme } from 'vitepress'
import JSSide from './javascript'
import GitSide from './git'
import TSSide from './typescript'
import VueSide from './vue'
export default {
  ...JSSide,
  ...GitSide,
  ...TSSide,
  ...VueSide,
} as DefaultTheme.Sidebar
