# 从 Windows 到 Ubuntu：Web 前端开发中的注意事项

  :::tip 原文地址
  [从 Windows 到 Ubuntu | GitHub](https://github.com/wild2life/daily-notes/issues/12)
  :::
  
作为一个 Web 前端开发工程师，切换到 Ubuntu 系统后，可能会遇到一些与 Windows 不同的开发体验。本文将总结一些需要注意的事项，帮助你更顺利地过渡到 Ubuntu 开发环境。

## 1. 文件系统差异

### 大小写敏感

- **Ubuntu**：文件系统是大小写敏感的。比如，`index.html` 和 `Index.html` 被视为不同的文件。
- **Windows**：文件系统是大小写不敏感的。所以，在 Ubuntu 上开发时，需要保持文件名的大小写一致，特别是在引用文件时。

### 路径分隔符

- **Ubuntu**：路径使用斜杠 `/`，比如 `/home/user/project/index.html`。
- **Windows**：路径使用反斜杠 `\`，例如 `C:\Users\user\project\index.html`。

确保路径格式的一致性，尤其是当你在代码中使用路径时。

## 2. 终端操作

Ubuntu 使用的是 Linux shell（如 Bash），而 Windows 上常用的命令行工具是 Command Prompt 或 PowerShell。以下是一些常见的命令差异：

- **常用命令**：在 Ubuntu 中，常用命令如 `ls`（列出文件）、`cd`（改变目录）、`rm`（删除文件）与 Windows 的命令（如 `dir`、`del`）有所不同。

- **包管理器**：Ubuntu 使用 `apt`（Advanced Package Tool）来安装和管理软件包，而 Windows 上可能使用 `choco`（Chocolatey）等工具。

  安装软件包的例子：
 ```bash
  sudo apt update
  sudo apt install <package-name>
  sudo apt remove <package-name> //卸载保留配置
  sudo apt purge <package-name> // 完全卸载
  sudo apt autoremove // 清理不再需要的依赖包
```
- 从`.deb`安装包安装软件
很多软件都提供 `.deb` 安装包，你可以从官方网站下载 `.deb`文件并安装它们。
```bash
sudo dpkg -i <package-name>.deb
sudo dpkg -r <package-name> // 卸载保留配置
sudo dpkg --purge <package-name> // 完全卸载
```
- 解决依赖问题： 如果在安装 .deb 包时出现依赖问题，可以运行以下命令解决：
```bash
sudo apt-get install -f
```
## 3. 开发工具安装
### **Node.js** 和 **npm**
使用 `nvm`（Node Version Manager）来管理多个版本的 Node.js。你可以安装并切换不同版本的 Node.js。

安装 nvm：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
安装 Node.js：
```bash
nvm install node
```
### 前端框架和工具
- 在 `Ubuntu` 上，你可以和 Windows 上一样使用 Webpack、Vue CLI、React、Angular 等前端工具。确保安装所有必需的依赖和工具。
### IDE 和编辑器
- 常用的 IDE 如 Visual Studio Code 也支持 Ubuntu。
安装 `Visual Studio Code`：
```bash
sudo apt install code
```
你也可以使用其他文本编辑器如 Sublime Text、Vim 或 Emacs。
## 4. 文件权限
Ubuntu 对文件和目录的权限管理比 Windows 严格。你可能会遇到权限问题，特别是对于文件的读写权限。

解决方法：
- 修改文件权限：例如，如果某个文件需要执行权限，可以使用以下命令：
```bash
chmod +x <file-name>

```
## 5. 浏览器兼容性
- 在 Ubuntu 上，你可以使用 Chrome、Firefox 等浏览器进行开发和测试。
- 不同操作系统上的浏览器行为可能会有所差异，特别是在字体渲染、滚动行为等方面。
如果你的项目依赖于特定的浏览器版本，可以考虑使用 Docker 或 虚拟机 来模拟不同的环境。

## 6. 使用 WSL (Windows Subsystem for Linux)
如果你在某些情况下仍需要在 Windows 上使用 `Ubuntu`，可以考虑使用 `Windows Subsystem for Linux (WSL)`，它允许你在 `Windows` 环境中运行 `Linux` 发行版。


## 7. 文本编辑器
### 使用 `nano` 编辑器
`nano` 是一种简单易用的文本编辑器，通常在 Unix 和类 Unix 系统（如 Ubuntu）中使用。它在命令行界面下运行，适合快速编辑文本文件，尤其是配置文件和脚本。
在大多数 Ubuntu 系统中，`nano` 默认已经安装。如果没有安装，你可以通过以下命令安装 `nano`：

```bash
sudo apt install nano
```
### 基本命令和操作
要使用 `nano` 打开一个文件，可以在命令行中输入：
```bash
nano <file-name>
```
例如，要编辑一个名为 `example.txt` 的文件：
```bash
nano example.txt
```
#### 编辑文件
- 插入文本：直接开始输入，`nano` 会自动将输入内容插入到光标所在的位置。
- 删除字符：按 `Backspace` 或 `Delete` 键删除字符。
- 移动光标：使用箭头键（↑ ↓ ← →）移动光标。
- 查找文本：按 `Ctrl + W`，然后输入要查找的文本并按 Enter。
#### 保存文件
- 保存文件：按 `Ctrl + O`（即按住 Ctrl 键，然后按 O）。接着，按 `Enter` 键确认保存。
- 退出 nano：按 `Ctrl + X`。如果文件有更改，`nano` 会提示你保存更改，按 `Y`（Yes）确认保存，按 `N`（No）取消保存。
#### 常用快捷键
- `Ctrl + O`：保存文件（Write Out）。
- `Ctrl + X`：退出 `nano`（如果文件未保存，会提示是否保存）。
- `Ctrl + W`：查找文本（Search）。
- `Ctrl + K`：剪切当前行。
- `Ctrl + U`：粘贴剪切的行。
- `Ctrl + C`：显示光标所在的当前行列数。
- `Ctrl + G`：显示帮助文档。

## 8. 设置
### 确保系统软件包是最新的：
```bash 
sudo apt update && sudo apt upgrade -y
```
### 重新安装`gnome-control-center`
Settings 应用由 gnome-control-center 提供，可以尝试重新安装：
```bash
sudo apt remove gnome-control-center --purge
sudo apt install gnome-control-center
```

## 9. 系统更新和维护
定期更新 Ubuntu 系统非常重要，确保你使用的是最新的软件和安全补丁。
```bash
sudo apt update
sudo apt upgrade
```