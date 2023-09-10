import { DefaultTheme } from 'vitepress'
import lesson from './lesson'
import tool from './tools'
import problems from './problems'
import design from './design'
const sidebar = {
  ...lesson,
  ...tool,
  ...problems,
  ...design,
} as DefaultTheme.Sidebar

export { sidebar }
