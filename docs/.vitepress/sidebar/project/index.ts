import { DefaultTheme } from 'vitepress'
import vite from './vite'
import react from './react'
export default {
  ...vite,
  ...react,
} as DefaultTheme.Sidebar
