# Docker 部署 VITE_GLOB_API_URL 配置

  :::tip 原文地址
  [Docker 部署 VITE_GLOB_API_URL 配置 | GitHub](https://github.com/wild2life/daily-notes/issues/11)
  :::
  
## 背景

你希望在 Docker 部署过程中，通过动态传递环境变量的方式来设置 `VITE_GLOB_API_URL` 的值。

## 方法 1: 使用 Docker 的 --build-arg 参数
如果在构建时您需要动态设置 **VITE_GLOB_API_URL**，可以通过 Dockerfile 中的 ARG 和 ENV 来实现。下面是一个示例：
### 1. 修改 Dockerfile
```
# 使用合适的基础镜像
FROM node:18

# 设置构建参数
ARG VITE_GLOB_API_URL

# 设置环境变量
ENV VITE_GLOB_API_URL=${VITE_GLOB_API_URL}

# 设置工作目录
WORKDIR /app

# 拷贝 package.json 和其他依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝项目源代码
COPY . .

# 构建项目
RUN npm run build

# 运行应用
CMD ["npm", "run", "serve"]

```
### 2. 构建 Docker 镜像时传递参数
在构建镜像时，使用 --build-arg 来传递 **VITE_GLOB_API_URL** 的值：
```
docker build --build-arg VITE_GLOB_API_URL=http://your-api-url.com -t your-image-name .

```
## 方法 2: 使用 Docker 环境变量传递

你可以在 Docker 启动时通过环境变量来替换 `VITE_GLOB_API_URL` 的值，而不需要在 `env.production` 文件中进行硬编码。

### 1. 修改 `env.production` 文件

保持 `VITE_GLOB_API_URL` 在 `env.production` 文件中为默认值：

```env
VITE_GLOB_API_URL=/api/v1 或者 VITE_GLOB_API_URL=${VITE_GLOB_API_URL}
```
### 2.使用 Docker -e 参数传递环境变量
在启动 Docker 容器时，通过 -e 参数传递 **VITE_GLOB_API_URL** 的值。例如，假设你希望传递 http://your-api-url.com 作为 VITE_GLOB_API_URL：
```
docker run -e VITE_GLOB_API_URL=http://your-api-url.com -p 80:80 your-image-name
```
通过这种方式，容器在启动时会使用 Docker 中的环境变量替换** .env.production**文件中的默认值。

## 方法 3: 在启动时使用脚本重写环境变量
### 1. 创建启动脚本 start.sh
```
#!/bin/bash

# 替换 env 文件中的占位符
sed -i "s|VITE_GLOB_API_URL=.*|VITE_GLOB_API_URL=$VITE_GLOB_API_URL|" /app/.env.production

# 启动应用
npm run serve

```
### 2. 修改 Dockerfile 来使用启动脚本
```
# 使用合适的基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 拷贝 package.json 和其他依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝项目源代码
COPY . .

# 拷贝启动脚本
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# 设置容器启动命令
CMD ["start.sh"]

```
### 3. 运行 Docker 容器时传递环境变量
```docker run -e VITE_GLOB_API_URL=http://your-api-url.com -p 80:80 your-image-name
```
在这个方法中，start.sh 脚本会在容器启动时首先修改** env.production** 文件，然后启动您的应用。