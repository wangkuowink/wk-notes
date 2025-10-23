# Ubuntu 安装Charles

  :::tip 原文地址
  [Ubuntu 安装Charles | GitHub](https://github.com/wild2life/daily-notes/issues/14)
  :::
  
[Charles 官网](https://www.charlesproxy.com/) 下载Charles，Debian系列发行版可以使用 apt-get install charles-proxy 安装,不过需要提前安装对应key才可以安装，我这边是直接下载安装包解压安装。

## 1. 解压&安装
```
tar -xvf charles-proxy-4.6.3_amd64.tar.gz
mv charles /opt/
```
## 2.创建启动图标
因为解压安装默认是不会生成启动图标的，所以需要单独创建
```
cd /usr/share/applications

sudo touch charles.desktop

sudo gedit charles.desktop
```
接着输入如下信息:
```
[Desktop Entry]
Name=Charles
Exec=/opt/charles/bin/charles
Terminal=false
Type=Application
Icon=/opt/charles/icon/512x512/apps/charles-proxy.png
StartupWMClass=Charles
Comment=Charles
Categories=Utility;
```
最后赋予执行权限，接下来在启动页面搜索Charles 可以启动对应程序！
```
sudo chmod u+x charles.desktop 
```
## 3.Charles激活
- 然后打开Charles，
- “Help”选择“Register Charles
- ”输入生成账号和注册码即可
```
https://zhile.io
48891cf209c6d32bf4
```

