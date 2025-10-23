# 浏览器代理配置指南 - SwitchyOmega

  :::tip 原文地址
  [浏览器代理插件SwitchyOmega | GitHub](https://github.com/wild2life/daily-notes/issues/13)
  :::
  
## 背景
- **问题**: 电脑开启了 `Clash` 系统代理后，无法访问公司内网。
- **目标**: 配置浏览器代理插件，针对公司域名实现直连，其他流量通过代理。

---

## 下载和安装 SwitchyOmega
1. 打开 Chrome 浏览器。
2. 访问 [SwitchyOmega 的官方页面](https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif) 并安装插件。
3. 安装完成后，在浏览器右上角找到 **SwitchyOmega** 图标，点击进入配置页面。

---

## 配置步骤

### 1. 创建 Proxy Profile
1. 在 SwitchyOmega 界面中，点击 **"新建情景模式"**。
2. 在弹出的对话框中选择 **"代理模式"**，命名为 `Proxy`，然后点击 **"创建"**。
3. 填写代理服务器信息：
   - **Protocol**: 根据 Clash 设置，选择 `SOCKS5` 或 `HTTP`。
   - **Server**: 输入代理地址，通常为 `127.0.0.1`。
   - **Port**: 输入代理端口，通常为 `7890`（Clash 默认监听端口）。
4. 点击 **"应用选项"** 保存。

---

### 2. 创建 Switch Profile
1. 再次点击 **"新建情景模式"**。
2. 选择 **"自动切换模式"**，命名为 `Switch`，然后点击 **"创建"**。
3. 添加规则：
   - 点击 **"添加条件"**：
     - **规则名称**: 填写 `Company`。
     - **URL 匹配模式**: 选择 **"Host wildcard"**。
     - **匹配内容**: 输入 `*baidu*`（匹配所有包含 `baidu` 的域名）。
     - **操作**: 选择 **"直连 (Direct)"**。
4. 设置默认规则：
   - 滚动到页面底部，将 **默认情景模式** 设置为 `Proxy`。
5. 点击 **"应用选项"** 保存。

---

### 3. 启用 Switch Profile
1. 在 SwitchyOmega 配置页面顶部导航栏，切换到 **"选项"**。
2. 将 **默认情景模式** 设置为 `Switch`。
3. 确保 SwitchyOmega 插件的开关已启用。

---

## 验证配置
1. 打开 Clash 应用的日志界面，观察网络请求：
   - 访问公司域名（如 `baidu.com`），应显示 **直连**。
   - 访问其他外网（如 `github.com`），应显示 **通过代理**。
2. 确保公司内网和外网访问正常。

---

## 配置总结

### 代理模式 (`Proxy`) 配置
| 配置项      | 值              |
|-------------|-----------------|
| **Protocol** | HTTP 或 SOCKS5  |
| **Server**   | 127.0.0.1       |
| **Port**     | 7890            |

### 自动切换模式 (`Switch`) 配置
| 规则名称 | URL 匹配模式     | 匹配内容       | 操作      |
|----------|------------------|----------------|-----------|
| Company  | Host wildcard    | `*baidu*`    | Direct    |
| Default  | (默认匹配规则)   | 其他           | Proxy     |

---

通过以上配置，你的浏览器将实现以下效果：
- 访问公司域名（如 `baidu.com`）时直连，不经过代理。
- 其他所有流量通过 Clash 系统代理，确保外网访问正常。
