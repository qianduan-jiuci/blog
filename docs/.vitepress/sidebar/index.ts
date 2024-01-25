import { DefaultTheme } from 'vitepress'
import lesson from './lesson'
import tool from './tools'
import problems from './problems'
import design from './design'
import project from './project'
import optimiSide from './optimi'
const sidebar = {
  ...lesson,
  ...tool,
  ...problems,
  ...design,
  ...project,
  ...optimiSide,
} as DefaultTheme.Sidebar

export { sidebar }
