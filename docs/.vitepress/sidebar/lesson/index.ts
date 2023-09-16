import { DefaultTheme } from 'vitepress'
import JSSide from './javascript'
import GitSide from './git'
import TSSide from './typescript'
import VueSide from './vue'
import Nestjs from './nestjs'
export default {
  ...JSSide,
  ...GitSide,
  ...TSSide,
  ...VueSide,
  ...Nestjs,
} as DefaultTheme.Sidebar
