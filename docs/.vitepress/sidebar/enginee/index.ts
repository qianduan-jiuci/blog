import { DefaultTheme } from 'vitepress'
import webpackSide from './webpack'
import viteSide from './vite'
import axiosSide from './axios'
import cssAside from './sass'
export default {
  ...viteSide,
  ...webpackSide,
  ...cssAside,
  ...axiosSide,
} as DefaultTheme.Sidebar
