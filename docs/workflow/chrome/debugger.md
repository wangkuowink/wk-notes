# chrome debugger 技巧

- [developers](https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn)
- Open Chrome DevTools `Ctrl+Shift+I` (Windows) 或 `Cmd+Opt+I` (Mac)

## 🔥 console

### ✅ console.log({})

在使用 console.log();的时候，不仅仅打印变量，而是要打印对象，用大括号({})将变量包围起来。这样的优点是不仅会把变量的值打印，同时还会将变量名打印出来。

### ✅ `console.table` 格式化数据

打印数组或对象时，console.table() 比 console.log() 直观得多：

```js
const users = [
  { name: "Alice", age: 25, city: "北京" },
  { name: "Bob", age: 30, city: "上海" }
];
console.table(users);
```

 📌效果：以表格形式显示数据，方便查看。

### ✅ `$0 - $4` 快捷访问 DOM

- $0 代表 Elements 面板中选中的元素。
- $1 - $4 代表最近访问过的 4 个元素。

```js
$0.style.border = "2px solid red"; // 给选中的元素加红色边框
```

### ✅ 复制对象到剪贴板

```js
copy({ name: "Alice", age: 25 });
```

📌 用途：快速复制 JSON 数据，粘贴到其他地方（如 VS Code）。

### ✅ `monitorEvents()` 监听 DOM 事件

```js
monitorEvents(document.body, "click");

```

📌 用途：查看所有 click 事件，适用于调试事件监听。

停止监听：

```js
unmonitorEvents(document.body, "click");

```

### ✅ `$_`控制台引用上一次执行的结果

```js
'wangkuo'.split('')  // ['w', 'i', 'l', 'd', 'l', 'i', 'f', 'e']
$_.reverse() // ['e', 'f', 'i', 'l', 'd', 'l', 'i', 'w']
$_.join('') // 'e,f,i,l,d,l,i,w'
```

## 🎨 Elements 面板技巧

### ✅ 快速修改 CSS

双击元素 直接编辑 HTML。
双击 CSS 样式 立即修改，无需刷新页面。
按住 Alt + 鼠标滚轮 可以调整数值大小（如 margin: 10px）。

### ✅ 在 Console 选中某个元素

```js
$x("//button[text()='登录']")   // 通过 XPath 选中按钮
document.querySelector("button") // 通过 CSS 选择器
```

📌 用途：在 Console 里快速操作页面元素。

## 🌍 Network 面板技巧

### ✅ 复制 API 请求

在 Network 面板：
右键点击请求 → Copy as cURL
在终端执行 curl 命令，快速复现请求：

```sh
curl 'https://api.example.com/data' -H 'Authorization: Bearer abc123'

```

📌 用途：调试 API 请求，模拟请求数据。

### ✅ 一键重新发起请求

1. 选中**Network**
2. 点击**Fetch/XHR**
3. 选择要重新发送的请求
4. 右键选择**Replay XHR**

### ✅ 拦截并修改 API 响应

1. 右键请求 → Edit and Resend
2. 修改 Header 或 Body，然后重新发送请求。

📌 用途：测试不同参数对 API 的影响。

### ✅ 模拟慢网速

1. Network → No throttling
2. 选择 Slow 3G / Fast 3G

📌 用途：测试网页在低网速下的加载情况。

## ⚡ Performance 面板优化

### ✅ 分析页面性能

1. 打开 `Performance` 面板 → 点击 `Record`
2. 录制页面加载过程 → 找到耗时的任务（红色区域）

📌 用途：查找影响页面性能的代码，如 layout shifts 和 render blocking。

## 🔍 Sources 面板技巧

### ✅ 断点调试 JavaScript

1. 右键行号 → `Add breakpoint`

2. 代码执行到该行时会暂停，你可以：

- Step over (F10) 跳过当前函数
- Step into (F11) 进入函数内部
- Step out (Shift + F11) 退出函数

📌 用途：查找 bug，比 console.log() 更高效。

### ✅ 在控制台修改 JavaScript 变量

在断点调试时，可以直接修改变量：

```js
someVariable = "新值";

```

📌 用途：实时修改代码逻辑，验证不同变量的影响。

### ✅ 暂停 UI 在 Hover 状态下的展示结果

我们很难去检查一个只有在 Hover 状态下展示的元素。比如，如何去检查一个 tooltip？如果你右键并选择检查，元素已经消失了。那么有办法吗？

1. 打开 `sources` 面板
2. 显示 `tooltip`
3. 使用快捷键来暂停脚本执行(将鼠标停留在暂停的图标上查看快捷键)
4. 回到 Elements 面板，然后像通常一样去检查元素

## 🎭 Lighthouse 进行网站性能分析

在 Lighthouse 面板：

1. 选择 Performance、SEO、Accessibility 选项
2. 点击 Generate Report

📌 用途：自动分析网站的加载速度、可访问性、SEO 等问题。

## 🔥 Application 面板技巧

### ✅ 清理 Local Storage / Cookies

- Local Storage：右键 Clear
- Cookies：右键 Delete
📌 用途：清理缓存，测试登录状态。

### ✅ 直接修改 Local Storage

```js
localStorage.setItem("token", "abc123");

```

📌 用途：模拟用户登录状态，无需重复输入密码。

## 🚀 Bonus：隐藏/修改页面内容

### ✅ 一键隐藏广告

```js
document.querySelectorAll(".ad-banner").forEach(el => el.style.display = "none");

```

📌 用途：隐藏烦人的广告，专注调试页面。

### ✅ 修改网站文字

```js
document.body.innerHTML = document.body.innerHTML.replace(/旧文字/g, "新文字");

```

📌 用途：修改页面内容，测试多语言适配。

## 🎯 开发者必备 Chrome 扩展

| **扩展名** | **功能** |
|-----------|---------|
| [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/) | React 组件调试 |
| [Vue.js DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/) | Vue 组件调试 |
| [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/) | JSON 格式化 |
| [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/) | 网站性能优化 |
