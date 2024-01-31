import { DefaultTheme } from 'vitepress'
import vite from './vite'
import react from './react'
import HttpSide from './http'
export default {
  ...vite,
  ...react,
  ...HttpSide,
} as DefaultTheme.Sidebar
