# 使用 rollup 打包用户脚本（user script）

  :::tip 原文地址
  [使用 rollup 打包用户脚本 | GitHub](https://github.com/wild2life/daily-notes/issues/15)
  :::
    
## 用户脚本 OR 油猴脚本

用户脚本（user script）是指在浏览器中运行的脚本，用于自定义网页的行为和外观。这些脚本可以修改网页内容、添加新的功能、自动执行任务、屏蔽广告、修改样式等等。在[油猴（Tampermonkey）插件](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)中，用户脚本也被称为油猴脚本，因为这个插件专门用于编写、运行、管理用户脚本

## 为什么要使用 rollup 打包

最近在更新我的 [油猴脚本 —— 115 小助手](https://github.com/maomao1996/tampermonkey-scripts/blob/93187567c678889ff75fe5a36eda7cb7edf7d866/packages/115-helper/115-helper.user.ts) 时有点越来越头大（维护不动了），其头大的原因有：

- 单文件开发（代码量越来越大）
- 公共函数需要手动复制粘贴
- CSS 需要放在 JavaScript，没有智能提示
- 虽说用了 TypeScript 但当时只想着有个 TypeScript 项目可以练手，不至于学了就忘

## 配置 rollup

安装 rollup（当前使用的是 3.x 版本）

```sh
pnpm add -D rollup
```

编写 rollup 配置文件 `rollup.config.js`

```js
import { defineConfig } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

const file = `${process.env.BUILD === 'development' ? 'dist-dev' : 'dist'}/115-helper.user.js`

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file,
    format: 'iife'
  }
})
```

配置 `package.json`

```json
{
  "type": "module",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup --environment BUILD:development -c --watch"
  }
}
```

- `-c` 读取配置文件
- `--environment` 设置环境变量
- `--watch` 监听文件变化

## 配置 CSS 编译

安装 `rollup-plugin-postcss`

```sh
pnpm add -D rollup-plugin-postcss
```

配置 `rollup.config.js`

```js
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  // ... 省略上面的配置
  plugins: [postcss({ minimize: true })]
})
```

## 配置 TypeScript 编译器

安装 `typescript`

```sh
pnpm add -D typescript
```

添加 `tsconfig.json` 文件

```json
{
  "compilerOptions": {
    "lib": ["DOM", "ESNext"],
    "module": "ESNext"
  },
  "include": ["src/**/*.ts", "types/*.d.ts"]
}
```

在配置编译器时遇到点小问题，这里记录一下

### 使用 esbuild

安装 `rollup-plugin-esbuild`

```sh
pnpm add -D rollup-plugin-esbuild
```

配置 `rollup.config.js`

```js
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  // ... 省略上面的配置
  plugins: [
    postcss({ minimize: true }),
    esbuild({
      target: 'es2015'
    })
  ]
})
```

**问题记录**：

- 只支持编译到 es2015
- 代码中的块级注释无法删除 `/** 这是注释 **/`（可以配置 `minify: true` 压缩代码但这个不是我想要的）

[Comments not being removed in latest esbuild](https://github.com/evanw/esbuild/issues/3117)

### 使用 swc

安装 `rollup-plugin-swc3`

```sh
pnpm add -D rollup-plugin-swc3
```

配置 `rollup.config.js`

```js
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { swc } from 'rollup-plugin-swc3'

export default defineConfig({
  // ... 省略上面的配置
  plugins: [
    postcss({ minimize: true }),
    swc({
      jsc: {
        target: 'es5'
      }
    })
  ]
})
```

**问题记录**：

- 代码中的块级注释无法删除 `/** 这是注释 **/`
- `jsc.minify.format` 配置项无效

在官方文档 [jsc.minify.format | swc](https://swc.rs/docs/configuration/minification#jscminifyformat) 中有这么一句话：These properties are mostly not implemented yet, but it exists to support passing terser config to swc minify without modification.（这些属性大多尚未实现，但它的存在是为了支持将 `terser` 配置传递到 `swc minify` 而不进行修改）

### 使用 terser 移除注释

安装 `rollup-plugin-terser`

```sh
pnpm add -D rollup-plugin-terser
```

配置 `rollup.config.js`

```js
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { swc } from 'rollup-plugin-swc3'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  // ... 省略上面的配置
  plugins: [
    postcss({ minimize: true }),
    swc({
      jsc: {
        target: 'es5'
      }
    }),
    terser({
      mangle: {
        keep_fnames: true
      },
      compress: {
        defaults: false
      },
      format: {
        ascii_only: true,
        beautify: true,
        indent_level: 2
      }
    })
  ]
})
```

## 配置油猴脚本头部信息

安装 `rollup-plugin-userscript`

```sh
pnpm add -D rollup-plugin-userscript
```

配置 `rollup.config.js`

```js
import { defineConfig } from 'rollup'
import metablock from 'rollup-plugin-userscript-metablock'

import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  // ... 省略上面的配置
  plugins: [
    // ... 省略上面的配置
    metablock({
      // 引入 json 配置文件
      file: './meta.json',
      // 使用 package.json 中的字段进行覆盖
      override: {
        name: pkg.name,
        version: pkg.version
      }
    })
  ]
})
```

也可以使用 [rollup-plugin-userscript](https://github.com/violentmonkey/rollup-plugin-userscript)

## 其他说明

- 使用了 `pnpm` 作为包管理器，如果你使用的是 `npm` 或 `yarn`，请自行替换命令
- 完整的配置文件请参阅 [tampermonkey-scripts | maomao](https://github.com/maomao1996/tampermonkey-scripts)
