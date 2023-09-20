import { DefaultTheme } from 'vitepress'
import vitePressSide from './vitepress'
import GitSide from './git'
import prismaSide from './prisma'
export default {
  ...vitePressSide,
  ...GitSide,
  ...prismaSide,
} as DefaultTheme.Sidebar
