import { DefaultTheme } from 'vitepress'
import JSSide from './javascript'
import GitSide from './git'
import TSSide from './typescript'
export default {
  ...JSSide,
  ...GitSide,
  ...TSSide,
} as DefaultTheme.Sidebar
