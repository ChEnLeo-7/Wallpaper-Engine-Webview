# Wallpaper Engine 创意工坊下载工具

> 免登录下载 Wallpaper Engine 创意工坊壁纸，支持 Steam 账号登录和在线视频播放。

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## 关于二改作者的话
此项目从上流项目 [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web) Fork 而来，利用 AI 编程做了点自己中意的个性化需求，目前在 FNOS 的 Docker 和 Windows 上通过测试，可能稍有遗漏。注意，下面部分内容为 AI 编写，注意目前仍有一些未完善和小 BUG，但基本不影响使用

### 以下是作者原话：
注：根据用户使用猖獗性而定，如有必要后期只留视频下载选项 如非必要则保持现状。 【本项目仅应急娱乐使用 不要视作为破解的理由】

## 项目徽章

[![version](https://img.shields.io/badge/version-4.3.0-3fb950?style=flat-square)](https://semver.org/)
[![node](https://img.shields.io/badge/node-%3E%3D16-43853d?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![runtime](https://img.shields.io/badge/runtime-Node.js-5fa04e?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/en/about)
[![downloader](https://img.shields.io/badge/downloader-SteamCMD-1b2838?style=flat-square&logo=steam&logoColor=white)](https://developer.valvesoftware.com/wiki/SteamCMD)
[![frontend](https://img.shields.io/badge/frontend-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![dependency](https://img.shields.io/badge/dependency-zero-0ea5e9?style=flat-square)](https://nodejs.org/docs/latest/api/)

## 技术栈展示

<p>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" /></a>
  <a href="https://developer.valvesoftware.com/wiki/SteamCMD" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/steam/ffffff" alt="SteamCMD" width="48" height="48" /></a>
  <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=js,html,css" alt="JavaScript, HTML, CSS" /></a>
</p>

## 项目简介

本项目是一个基于 Web 的 Steam 创意工坊下载工具，专为 Wallpaper Engine 设计。它通过网页界面提供壁纸搜索、在线播放和下载功能。

**核心优势**：利用 **SteamCMD** 的匿名登录特性，无需登录个人 Steam 账号即可下载大部分公开的壁纸资源。（作者PS：实测匿名下载大部分好像都不行，最好登录Steam账号😅）

## 二改特色

- **Steam 账号登录**：支持网页登录 Steam 账号，下载需要权限的壁纸
- **在线视频播放**：视频类壁纸可直接在浏览器中播放，无需下载（会缓存在服务端本地）
- **持久化登录**：登录一次，重启服务自动恢复，无需重复输入密码（这个似乎有问题）
- **自动打包规则**：
  - **场景/程序/网页类壁纸**：下载后自动打包为 `.zip` 压缩包
  - **视频类壁纸**：直接提取原始视频文件（.mp4等），可直接播放
- **零依赖构建**：仅使用 Node.js 原生模块，无需 `npm install`，开箱即用

## 截图展示
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/2d18b9bf-e4c0-4c89-9749-09eb00c0ffb1" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/9ddaea0f-b8a5-4ca5-b62b-824384b8194b" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/b8b09a80-4d0e-4d12-b664-537b6c7ce0b0" />
<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/6caeb577-1585-44a7-9e1b-9dfce8357303" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/1d1699ac-7530-44a0-8209-350f1628f52c" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/c53e2283-583d-4d16-8ec6-d87e09d96a69" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/5486d689-658d-498d-9c08-febd6fe2d40a" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/4d39e199-6012-4de6-866c-94fd8ee5dd41" />



## 技术架构

- **运行环境**：Node.js (>=16)
- **核心下载器**：[SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve 官方命令行工具)
- **前端**：原生 JavaScript (无框架)
- **后端**：Node.js 原生 `http` 模块
- **视频播放**：HTML5 Video API + Range 请求支持

## 前置要求

1. **Node.js**：请确保设备已安装 Node.js (v16 或更高版本)
2. **网络访问（按地区）**：是否需要代理取决于你的网络环境。若你所在地区可直连 Steam 创意工坊则无需代理；若访问受限，再开启系统代理或配置代理环境变量
3. **SteamCMD**：程序启动时会自动尝试查找或下载 SteamCMD。如果失败，请检查网络或手动下载 SteamCMD 放入 `steamcmd` 目录

## 快速开始

`PS`：**第一次使用需要在线下载SteamCMD，你需要点击网页右上角用户图标，输入账号密码触发下载**

### Windows

1. **下载**本项目代码
2. **启动服务**：
   ```bash
   node server.js
   ```
3. **访问网页**：在浏览器打开 `http://localhost:3090`  

### Docker 部署

1. 下载完整的项目代码，在你部署的路径上新建文件夹 `node_server_data`  
2. 将项目全部完整文件放到 `node_server_data` 文件夹下
3. 然后在 `node_server_data` 的上一个文件夹下新增文件 `dockerfile` 、 `docker-compose.yml` ，分别填写下面的内容进去  

**Dockerfile**

```dockerfile
# 基础镜像
FROM node:18-slim

# 安装 SteamCMD 依赖
RUN apt-get update && \
    dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        wget \
        curl \
        ca-certificates \
        lib32gcc-s1 \
        lib32stdc++6 \
        libc6-i386 \
        libcurl4-gnutls-dev:i386 \
        lib32z1 \
        && \
    rm -rf /var/lib/apt/lists/*

# 安装 SteamCMD
RUN mkdir -p /steamcmd && \
    cd /steamcmd && \
    wget -q https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz && \
    tar -xvzf steamcmd_linux.tar.gz && \
    rm steamcmd_linux.tar.gz && \
    chmod +x steamcmd.sh

# 设置环境变量
ENV STEAMCMD_DIR=/app
ENV PATH="${STEAMCMD_DIR}:${PATH}"

# 设置工作目录（可被 docker-compose 覆盖）
WORKDIR /app

# 不复制任何 Node 代码，完全通过挂载方式运行
# 只安装全局工具（可选）
RUN npm install -g nodemon pm2 2>/dev/null || true

# 暴露端口（可被 docker-compose 覆盖）
EXPOSE 3090

# 默认命令，可被 docker-compose 覆盖
CMD ["node", "server.js"]
```
**docker-compose.yml**
```docker-compose
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: Wallpaper-Webview
    # 重启策略
    restart: always
    # 端口映射
    ports:
      - "3090:3090"
    # 环境变量
    #environment:
      #- NODE_ENV=production
      # 可以根据需要添加其他环境变量
      # - STEAM_USERNAME=your_username
      # - STEAM_PASSWORD=your_password
    volumes:
      # 挂载项目文件的路径
      - ./node_server_data:/app
      # 挂载 SteamCMD 数据目录（如果需要持久化 Steam 数据）
      - ./steamcmd_data:/root/Steam
    # 工作目录
    working_dir: /app
    # 启动命令（如果需要覆盖 Dockerfile 中的 CMD）
    command: node server.js
    # 或者使用 nodemon 进行开发
    # command: nodemon server.js
    # 网络模式
    networks:
      - app-network

# 自定义网络
networks:
  app-network:
    driver: bridge
```

4. 运行构建命令：
    ```
    docker-compose up -d
    ```
   或者你是图形化 NAS 界面则手动在 web 界面选中 dockerfile 和 docker-compose 所在的路径
   
6. **访问网页**：在浏览器打开 `http://localhost:3090` 

**重要提示**：必须挂载 `/root/Steam` 目录才能实现登录状态持久化！

## 功能说明

### 1. Steam 账号登录

#### 使用方法
1. 点击页面右上角的用户图标按钮
2. 输入 Steam 用户名、密码和 Steam Guard 验证码（如果Steam开启了手机验证则查看手机版Steam放行登录请求）
3. 点击"登录"按钮
4. 登录成功后，按钮变为绿色，显示已登录状态

#### 持久化登录（功能存疑）
- 登录成功后，凭据自动保存到 `/root/Steam` 目录
- 重启服务后自动恢复登录状态，无需重新输入密码
- 下载和视频播放时复用已登录会话，不会触发重复登录
- **不会收到手机 Steam 登录验证请求**

#### 退出登录
- 点击绿色用户图标按钮
- 确认退出后，清除登录状态和持久化文件

### 2. 在线视频播放

#### 使用方法
1. 在筛选器中选择"视频"类型
2. 点击视频壁纸卡片打开详情页
3. 点击绿色的"在线播放视频"按钮
4. 视频播放器自动打开并开始播放（第一次播放可能会有点久，详细可以看服务端后台日志）

#### 技术特性
- 支持 HTTP Range 请求，可拖动进度条
- 视频缓存机制，播放过的视频无需重新下载
- 支持多种视频格式：MP4, WebM, AVI, WMV, MKV, MOV 等
- 使用 HTML5 原生播放器，支持全屏、音量调节等功能

### 3. 视频缓存管理

#### 设置缓存天数
1. 点击右上角设置按钮（齿轮图标）
2. 在"视频缓存设置"中设置缓存天数（默认 7 天）
3. 超过设置天数的缓存文件会自动清理

#### 手动清理缓存
1. 打开设置面板
2. 点击"立即清除已缓存的创意工坊项目"按钮
3. 确认后清除所有缓存的视频文件（清除`/root/Steam/steamapps/431960/`目录下的所有创意工坊文件缓存）

## 高级配置

你可以通过设置环境变量来调整工具行为：

| 环境变量 | 说明 | 默认值 |
|----------|-------------|---------|
| `PORT` | 服务端口 | `3090` |
| `HTTP_PROXY` | 代理地址 (如 `http://127.0.0.1:7890`) | 自动读取系统代理 |
| `STEAM_CONFIG_DIR` | Steam 配置目录 | `/root/Steam` |
| `STEAM_USERNAME` | Steam 账号 (环境变量登录) | - |
| `STEAM_PASSWORD` | Steam 密码 | - |
| `STEAM_COUNTRY` | 商店地区代码 | - |
| `STEAM_LANG` | 语言设置 | `schinese` |

## API 接口

### Steam 登录相关
- `POST /api/steam/login` - 登录 Steam 账号
- `POST /api/steam/logout` - 退出登录
- `GET /api/steam/status` - 查询登录状态

### 视频播放相关
- `GET /api/video/stream?id=<id>` - 视频流接口
- `POST /api/video/cache/clear` - 清除视频缓存
- `GET /api/video/cache/settings` - 获取缓存设置
- `POST /api/video/cache/settings` - 更新缓存设置

### 壁纸下载相关
- `POST /api/steam/query` - 查询壁纸列表
- `GET /api/steam/details?id=<id>` - 获取壁纸详情
- `GET /api/download?id=<id>&title=<title>` - 下载壁纸

## 使用技巧

### 登录状态持久化
```
首次登录 → 凭据保存到 /root/Steam → 重启服务 → 自动恢复登录
```

### 避免重复登录
```
持久化登录 → 下载时复用会话 → 无需密码 → 不触发 Steam Guard
```

### 视频缓存优化
```
首次播放 → 下载并缓存 → 后续播放 → 直接使用缓存 → 快速加载
```

## 故障排查

### 问题 1：登录后重启服务状态丢失
**解决方案**：
- 确保 Docker 容器挂载了 `/root/Steam` 目录
- 检查 `/root/Steam/config/loginusers.vdf` 文件是否存在

### 问题 2：下载时收到手机验证请求
**解决方案**：
- 确认已通过网页登录
- 查看日志确认使用的是 `persistent login`
- 检查是否使用了共享目录（`shared dir: true`）

### 问题 3：视频无法播放
**解决方案**：
- 检查网络连接
- 查看服务器日志中的错误信息
- 尝试清除缓存后重新播放

### 问题 4：视频缓存占用空间过大
**解决方案**：
- 在设置中调整缓存天数
- 使用"立即清除缓存"功能
- 手动删除 `/steamapps/431960/` 目录下的创意工坊缓存文件

## 更新日志

### v4.3.0 (最新)
- ✅ 修复：网页登录后重启服务登录状态丢失
- ✅ 修复：下载时重复触发登录流程
- ✅ 修复：手机收到重复的 Steam 登录请求
- ✅ 新增：视频缓存天数设置
- ✅ 新增：手动清除缓存功能
- ✅ 优化：使用共享目录复用 Steam 会话
- ✅ 优化：退出登录时清理持久化文件
- ✅ 优化：视频自动播放功能
- ✅ 更新：设置按钮图标样式

### v2.1.0
- ✨ 新增：Steam 账号登录功能
- ✨ 新增：在线视频播放功能
- 🎨 优化：UI/UX 设计
- 📝 完善：文档

### v2.0.0
- 基础下载功能
- 壁纸浏览和搜索
- 多语言支持


## 安全性说明

1. **密码不存储**：持久化登录后，密码立即从内存中清除
2. **会话复用**：使用 Steam 官方的会话机制，安全可靠
3. **本地验证**：所有操作都在本地环境完成
4. **自动备份**：退出登录时自动备份配置文件

## 开发声明

本项目全程依托人工智能辅助完成构建。发布者未审阅、未编写任何一行代码内容；若与其他项目存在代码雷同，均属巧合。仅供学习交流使用。
