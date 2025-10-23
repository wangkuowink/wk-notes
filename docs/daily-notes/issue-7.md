# 修改 `node_modules` 中的依赖（打补丁）

  :::tip 原文地址
  [修改 `node_modules` 中的依赖（打补丁） | GitHub](https://github.com/wild2life/daily-notes/issues/7)
  :::
    
> 为什么要修改 `node_modules` 中的依赖？

1. 依赖包有 `bug`，但作者没有及时修复
2. 依赖包的版本过旧，但不能升级到新版本
3. 对依赖包的功能有定制化需求时

## 常见做法

- 自己维护这个 `npm` 包
  - 维护成本较高，周期长
- 直接修改 `node_modules` 中的依赖
  - 适合应急，周期短
  - 修改只在本地生效
  - 适合对 `npm` 包的修改不需要发布的情况
- 对 `node_modules` 中的依赖打补丁
  - 适合应急，周期短
  - 提交补丁文件后修改可在本地和远程生效
  - 适合对 `npm` 包的修改不需要发布的情况

## 什么是打补丁？

打补丁是一种在不修改原始文件的情况下对文件进行增量修改的技术，它可以用来修复 `bug`、添加功能、或者改变行为。

打补丁的原理是使用 `diff` 工具来比较两个文件（或目录）之间的差异，并生成一个补丁文件（patch file），这个补丁文件记录了如何从一个文件（或目录）变成另一个文件（或目录）所需要做的修改，然后使用 `patch` 工具来将补丁文件应用到原始文件（或目录）上，从而实现修改。

打补丁有以下优点：

- 补丁文件通常很小，可以节省磁盘空间和网络带宽
- 补丁文件可以被提交到版本控制系统中，方便追踪和管理
- 补丁文件可以在不同的平台和环境中使用，提高兼容性和可移植性
- 补丁文件可以在安装或更新依赖包后自动应用，减少手动操作

## 如何打补丁

不同的包管理器，打补丁的方法也不同，但其原理都是一样的

1. 在项目目录下生成一个 `patches` 文件夹，里面存放着所有的补丁文件（其补丁内容为 `diff` 格式）
2. 在 `npm install` 后自动应用补丁

### 使用 `pnpm` 或 `yarn v2+`

`pnpm` 和 `yarn v2+` 都提供了 `patch` 命令，可以直接使用

**以 `pnpm` 为例**

添加补丁，该命令会将指定的软件包提取到一个可以随意编辑的临时目录中供我们修改

```sh
pnpm patch <pkg name>@<version>

# 🌰
pnpm patch @astrojs/cli-kit@0.2.3
```

生成补丁文件到项目中（默认保存在项目根目录下的 `patches` 目录中）

```sh
# <path> 是之前提取的临时目录
pnpm patch-commit <path>
```

### 使用 `npm` 或 `yarn v1` 时

使用 `npm` 或 `yarn v1` 管理依赖时，需要借助第三方工具 `patch-package` 来实现对 `node_modules` 中的依赖打补丁

**以 `npm` 为例**

```sh
# 1. 安装 patch-package
npm i -D patch-package

# 2. 添加 postinstall 脚本，以便在每次 npm install 后自动应用补丁
npm pkg set scripts.postinstall="patch-package"

# 3. 修改 node_modules 指定依赖包

# 4. 生成补丁 <pkg name> 是上一步修改的依赖包名称
npx patch-package <pkg name>
```

## 参考

- [pnpm patch &lt;pkg&gt; | pnpm](https://pnpm.io/zh/cli/patch)
- [patch-package | GitHub](https://github.com/ds300/patch-package)
