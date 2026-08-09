# Wallpaper Engine 创意工坊下载工具

> 一个 Web 版 Wallpaper Engine 创意工坊壁纸，支持 Steam 账号登录和在线视频播放。

> [!CAUTION]
>
> # 本项目进入停止开发
>
> 项目已不再继续开发，后续更新和开发资源全部转到 [WallHub2.0](https://github.com/ChEnLeo-7/WallHub2.0)

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## 关于参考


>参考的项目：  
>- https://github.com/0ran/wallpaper-engine-download-web  （原作者）  
>- https://github.com/TulpaMavis/wallpaper-engine-download-web  （二改作者 & Docker适配）

此项目从上流项目 [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web) Fork 而来，后基于 [TulpaMavis/wallpaper-engine-download-web](https://github.com/TulpaMavis/wallpaper-engine-download-web) 利用 AI 编程做了点自己中意的个性化需求，目前在 FNOS 的 Docker 和 Windows 上通过测试，Docker 环境下稍微比 Windows 兼容更多些，可能稍有遗漏。注意，下面部分内容为 AI 编写，注意目前仍有一些未完善和小 BUG，但基本不影响使用


## 项目简介

本项目是一个基于 Web 的 Steam 创意工坊下载工具，专为 Wallpaper Engine 设计。它通过网页界面提供壁纸搜索、在线播放和下载功能。

**核心优势**：部署好在服务端，客户端无需下载即可网页串流播放 Wallpaper 视频项目，也可以打包下载，服务端支持 Steam 账号登录、Steam API Key 支持（获得更全的 Wallpaper 项目）、下载队列管理

## 二改特色

原项目的功能特色再此不重复：

- **👤Steam 网页账号登录**：支持直接在网页登录 Steam 账号，同时支持邮箱验证码，登录下载需要权限的壁纸，以及固化登录状态
- **🔑Steam API 支持**：支持输入自己的Steam API，输入并保存，点击按钮启用，此时刷新列表后会支持获取完整的Wallpaper列表
- **📺在线视频播放**：视频类壁纸可直接在浏览器中播放，观看设备无需下载（服务端会下载后串流给客户端播放，缓存可以清理）
- **⬇️下载队列管理**：你可以将Wallpaper项目添加至后台下载/直接播放/打包下载，除了打包，其余操作进度都会在此展示，完成后你可以进行管理
- **📦订阅后打包下载**：
  - **场景/程序/网页类壁纸**：当点击"订阅"后，下载至服务端打包成 `.zip` 压缩包发送到客户端下载;当点击"添加后台下载"，则仅下载到服务端本地（需要批量下载时可如此操作）
  - **视频类壁纸**：当点击"订阅"后，下载至服务端打包成 `.zip` 压缩包发送到客户端下载;当点击"稍后再看"，则仅下载到服务端本地（需要批量下载时可如此操作），当点击"播放视频"时则直接加载播放界面准备播放，同时显示进度
- **🔃网页服务端重启（仅Docker）**：你可以在设置中重启服务端
- **⭐️页面动效**：在部分界面中，增加了一些动效丰富视觉

## 截图展示
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/a7172104-95f1-49f9-a9e2-9773dfed78d4" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/2aaafca8-4a49-41ae-a375-a9233999b124" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/6b3b6a24-7368-4f61-b15b-fbbc40aa908c" />
</br></br>
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/7b30b78f-0bdc-428a-a9a1-c199afb3d910" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/1d1a09b5-9b4d-4792-88f8-9b8d616261f4" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/0a6c37fe-3664-4820-a187-8f67990b7a75" />
</br></br>

## 技术架构

- **运行环境**：Node.js (>=16)
- **核心下载器**：[SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve 官方命令行工具)
- **前端**：原生 JavaScript (无框架)
- **后端**：Node.js 原生 `http` 模块
- **视频播放**：HTML5 Video API + Range 请求支持

## 前置要求

1. **Node.js**：请确保设备已安装 Node.js (v16 或更高版本)
2. **网络访问（按地区）**：是否需要代理取决于你的网络环境。若你所在地区可直连 Steam 创意工坊则无需代理；若访问受限，再开启系统代理或配置代理环境变量
> 如需 Docker/Linux 免代理访问可以下载隔壁项目的 [Steamcommunity_302](https://github.com/TulpaMavis/wallpaper-engine-download-web/tree/main/wallpaper-webview/Steamcommunity_302)，进一步配置请查看 [docker-compose.yml](https://github.com/TulpaMavis/wallpaper-engine-download-web/blob/main/wallpaper-webview/docker-compose.yml)
3. **SteamCMD**：程序启动/调用 SteamCMD 时会自动尝试查找或下载 SteamCMD。如果失败，请检查网络或手动下载 SteamCMD 放入 `steamcmd` 目录

## 快速开始

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

# 安装 SteamCMD 依赖、zip 和 unzip
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
        zip \
        unzip \
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
CMD ["node", "--expose-gc", "server.js"]
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
      #- HTTP_PROXY=你的HTTP代理地址
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
    network_mode: host
    deploy:
      resources:
        limits:
          #cpus: '2'
          memory: 500M
```

4. 运行构建命令：
    ```
    docker-compose up -d
    ```
   
6. **访问网页**：在浏览器打开 `http://localhost:3090` 

**重要提示**：必须挂载 `/root/Steam` 目录才能实现登录状态持久化！

## 功能说明

### 1. Steam 账号登录

#### 使用方法
1. 点击页面右上角的用户图标按钮
2. 输入 Steam 用户名、密码和 Steam Guard 验证码（如果Steam开启了手机验证则查看手机版Steam放行登录请求）
3. 点击"登录"按钮
4. 登录成功后，按钮变为绿色，显示已登录状态

#### 退出登录
- 设置中点击用户卡片退出账号
- 确认退出后，清除登录状态和持久化文件

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

## 开发声明&免责声明

> 本项目全程依托人工智能辅助完成构建。发布者未审阅、未编写任何一行代码内容；若与其他项目存在代码雷同，那就是我抄了，仅供学习交流使用，请在24小时内删除

1. **非官方工具**：本工具是**第三方非官方工具**，与 Wallpaper Engine 官方、Steam 或 Valve 公司**无任何关联**。
2. **仅限个人使用**：本工具**仅供个人学习、研究和技术交流使用**，不得用于任何商业用途。
3. **尊重版权**：所有创意工坊内容版权均归原作者所有。请：
   - 仅下载您**已订阅**或**有权访问**的内容
   - 不得**传播、分发**下载的内容
   - 支持原创作者，在 Steam 上**订阅和点赞**喜欢的壁纸
4. **自用原则**：本工具仅为**简化个人下载流程**而开发。使用本工具意味着您**承诺**：
   - 仅下载**自己订阅**的壁纸
   - 不进行**批量下载**或**爬取**
   - 不**绕过任何付费限制**
5. **使用风险**：使用本工具可能违反 Steam 服务条款。您需自行承担所有风险，开发者**不承担任何责任**。
6. **禁止滥用**：**严禁**使用本工具：
   - 下载受版权保护且未授权的内容
   - 进行商业用途
   - 侵犯他人知识产权
   - 违反当地法律法规
7. **停止使用**：如您不同意以上条款，**请立即停止使用本工具**。

*本项目仅为技术演示，下载后请在24小时内删除，并支持正版。*
