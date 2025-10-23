import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/wk-notes/',

  lang: 'zh-CN',
  title: '内海',
  description: '我的理想永不坠落',
  head,
  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.jpg',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wangkuowink/wk-notes' }],

    // footer: {
      // message: '转载自 maomao1996',
      // copyright: 'Copyright © 2019-present maomao',
    // },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    // visitor: {
    //   badgeId: 'wangkuowink.wk-notes',
    // },

    // comment: {
    //   repo: 'wangkuowink/wk-notes',
    //   repoId: 'R_kgDONb9-0Q',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDONb9-0c4ClH5X',
    // },
  },

  /* 生成站点地图 */
  sitemap: {
    hostname: 'https://wangkuowink.github.io/wk-notes/',
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
