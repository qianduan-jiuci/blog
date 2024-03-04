import { DefaultTheme } from 'vitepress'
import JSSide from './javascript'
import GitSide from './git'
import TSSide from './typescript'
import VueSide from './vue'
import Nestjs from './nestjs'
import cssSide from './css'
export default {
  ...JSSide,
  ...GitSide,
  ...TSSide,
  ...VueSide,
  ...Nestjs,
  ...cssSide,
} as DefaultTheme.Sidebar
