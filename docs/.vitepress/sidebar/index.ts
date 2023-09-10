import { DefaultTheme } from 'vitepress'
import lesson from './lesson'
import tool from './tools'
import problems from './problems'
const sidebar = {
  ...lesson,
  ...tool,
  ...problems,
} as DefaultTheme.Sidebar

export { sidebar }
