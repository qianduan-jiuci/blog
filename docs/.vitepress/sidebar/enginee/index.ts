import { DefaultTheme } from 'vitepress'
import webpackSide from './webpack'
import viteSide from './vite'
import axiosSide from './axios'

export default {
  ...viteSide,
  ...webpackSide,
  ...axiosSide,
} as DefaultTheme.Sidebar
