# 使用 npm 脚本钩子

  :::tip 原文地址
  [使用 npm 脚本钩子 | GitHub](https://github.com/wild2life/daily-notes/issues/5)
  :::
  
## 钩子说明

在 `npm` 脚本中有 `pre` 和 `post` 两个钩子

比如 `build` 脚本命令的钩子就是 `prebuild` 和 `postbuild`

```json
{
  "scripts": {
    "prebuild": "echo I run before the build script",
    "build": "vue-cli-service build",
    "postbuild": "echo I run after the build script"
  }
}
```

当用户执行 `npm run build` 时会按如下顺序执行

```sh
npm run prebuild && npm run build && npm run postbuild
```

### 默认钩子

- `prepublish` `postpublish`
- `preinstall` `postinstall`
- `preuninstall` `postuninstall`
- `preversion` `postversion`
- `pretest` `posttest`
- `prestop` `poststop`
- `prestart` `poststart`
- `prerestart` `postrestart`

### 注意

1. 自定义的脚本命令也可以加上 `pre` 和 `post` 钩子
   比如 `deploy` 也有 `predeploy` 和 `postdeploy` 钩子

2. 双重的 `pre` 和 `post` 无效，
   比如 `prepretest`和 `postposttest`

### 相关资料

[npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

## 实战 —— 检测并更新依赖包

当公司内部维护的 `npm` 包升级时，可能会因为各种原因导致业务使用方更新不及时，这时我们可以在业务项目中编写 `npm` 脚本钩子，在执行 `start` 脚本时对这些 `npm` 包做检测并更新

### 添加 pre 脚本

在 `scripts` 目录下新建 `checkDependence.js`，并写入如下代码

这里用 `dayjs` 和 `axios` 举栗

```js
const child_process = require('child_process')
const semver = require('semver')
const chalk = require('chalk')

const pkg = require('../package.json')

const { log } = console
const NAME_ARRAY = ['dayjs', 'axios']

// 获取最新版本号
const getLatestVersion = (name) => {
  return child_process.execSync(`npm view ${name} version`, {
    encoding: 'utf8'
  })
}

// 获取本地版本号
const getLocalVersion = (name) => {
  const version = pkg.dependencies[name]
  if (version) {
    return pkg.dependencies[name].replace(/\^|~/g, '')
  }
  log(chalk.yellow(`还没有安装 ${name} 哦`))
  return '0.0.0'
}

for (const name of NAME_ARRAY) {
  const latest = getLatestVersion(name)
  if (semver.gt(latest, getLocalVersion(name))) {
    log(chalk.blue(`正在安装 ${name}@${latest}`))
    child_process.exec(`npm i ${name}`)
  } else {
    log(chalk.green(`已安装最新的 ${name}@${latest}`))
  }
}
```

修改 `package.json` 的 `scripts`

```diff
{
  "scripts": {
    ...
+   "prestart": "node ./scripts/checkDependence.js"
  }
}
```

![使用效果](https://cdn.jsdelivr.net/gh/maomao1996/daily-notes/static/20/20-1.png)

### npm 相关命令说明

1. `npm view <name>` 查询并返回指定包的所有信息
2. `npm view <name> versions` 查询并返回指定包的所有版本信息（数组格式）
3. `npm view <name> version` 查询并返回指定包的最新版本号

### 相关资料

[npm-view](https://docs.npmjs.com/cli/v7/commands/npm-view)
