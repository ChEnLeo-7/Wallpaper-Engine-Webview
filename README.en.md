# Wallpaper Engine Workshop Download Tool

> Download Wallpaper Engine workshop wallpapers without logging in, with support for Steam account login and online video playback.

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## Notes on Modified Version

Referenced projects:  
https://github.com/0ran/wallpaper-engine-download-web  
https://github.com/TulpaMavis/wallpaper-engine-download-web

This project is forked from the upstream project [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web). Using AI programming, I've added some personalized features to meet my own needs. It has been tested on FNOS Docker and Windows, though there may be some minor omissions. Please note that some sections below are AI-generated, and there are still some incomplete parts and small bugs, but they do not significantly affect usability.

### Original Author's Statement:
Note: Depending on how aggressively users utilize this tool, if necessary, only the video download option may be retained in the future. Otherwise, it will remain as is. 【This project is intended for emergency entertainment use only and should not be considered a reason for cracking.】

## Project Badges

[![version](https://img.shields.io/badge/version-4.3.0-3fb950?style=flat-square)](https://semver.org/)
[![node](https://img.shields.io/badge/node-%3E%3D16-43853d?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![runtime](https://img.shields.io/badge/runtime-Node.js-5fa04e?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/en/about)
[![downloader](https://img.shields.io/badge/downloader-SteamCMD-1b2838?style=flat-square&logo=steam&logoColor=white)](https://developer.valvesoftware.com/wiki/SteamCMD)
[![frontend](https://img.shields.io/badge/frontend-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![dependency](https://img.shields.io/badge/dependency-zero-0ea5e9?style=flat-square)](https://nodejs.org/docs/latest/api/)

## Technology Stack

<p>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" /></a>
  <a href="https://developer.valvesoftware.com/wiki/SteamCMD" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/steam/ffffff" alt="SteamCMD" width="48" height="48" /></a>
  <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=js,html,css" alt="JavaScript, HTML, CSS" /></a>
</p>

## Project Introduction

This project is a web-based Steam Workshop download tool designed specifically for Wallpaper Engine. It provides wallpaper search, online playback, and download functionality through a web interface.

**Core Advantage**: Leveraging SteamCMD's anonymous login feature, most public wallpaper resources can be downloaded without logging into a personal Steam account. (Author's note: In practice, anonymous downloads often fail for many items; logging in with a Steam account is recommended 😅)

## Modified Features

The original project's features are not repeated here:

- **Steam Web Account Login**: Supports logging into a Steam account directly on the webpage, including email verification codes, to download wallpapers that require permissions
- **Steam API Support**: Supports entering and saving your own Steam API key; click the button to enable it, and after refreshing the list, you'll get access to the complete wallpaper list
- **Online Video Playback**: Video wallpapers can be played directly in the browser; the viewing device doesn't need to download them (the server downloads and streams them to the client for playback; cache can be cleared)
- **Automatic Packaging Rules**:
  - **Scene/Application/Web wallpapers**: Automatically packaged as `.zip` archives after download
  - **Video wallpapers**: Original video files (e.g., .mp4) are extracted directly for immediate playback

## Screenshots
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/cd5843fe-7bf5-4cc7-9966-0cd8f42bdbeb" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/5e47fc7e-d979-48d1-adb9-966c0b5dcc77" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/5ee3adba-31e9-42c3-bad1-46b3703c0722" />
</br></br>
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/9193144f-783f-42b0-8760-58994192e6aa" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/3862613b-048a-48aa-a499-2b8e069a2538" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/5d0e0b19-b2fb-4ef5-855a-599c44015006" />
</br></br>

## Technical Architecture

- **Runtime**: Node.js (>=16)
- **Core Downloader**: [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve official command-line tool)
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Backend**: Node.js native `http` module
- **Video Playback**: HTML5 Video API + Range request support

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or higher) is installed on your device
2. **Network Access (varies by region)**: Whether a proxy is needed depends on your network environment. If you have direct access to Steam Workshop in your region, no proxy is needed; if access is restricted, enable a system proxy or configure proxy environment variables
3. **SteamCMD**: The program will automatically attempt to locate or download SteamCMD on startup. If this fails, please check your network or manually download SteamCMD and place it in the `steamcmd` directory

## Quick Start

`PS`: **The first time you use it, you need to download SteamCMD online. Click the user icon in the top right corner of the webpage and enter your account credentials to trigger the download.**

### Windows

1. **Download** the project code
2. **Start the service**:
   ```bash
   # Standard startup
   node server.js
   
   # Recommended: Enable manual garbage collection (optimizes memory management)
   node --expose-gc server.js
   ```
3. **Access the webpage**: Open `http://localhost:3090` in your browser

### Docker Deployment

1. Download the complete project code and create a folder named `node_server_data` in your deployment path
2. Place all project files inside the `node_server_data` folder
3. In the parent folder of `node_server_data`, create new files `dockerfile` and `docker-compose.yml`, and add the following content respectively

**Dockerfile**

```dockerfile
# Base image
FROM node:18-slim

# Install SteamCMD dependencies
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

# Install SteamCMD
RUN mkdir -p /steamcmd && \
    cd /steamcmd && \
    wget -q https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz && \
    tar -xvzf steamcmd_linux.tar.gz && \
    rm steamcmd_linux.tar.gz && \
    chmod +x steamcmd.sh

# Set environment variables
ENV STEAMCMD_DIR=/app
ENV PATH="${STEAMCMD_DIR}:${PATH}"

# Set working directory (can be overridden by docker-compose)
WORKDIR /app

# Do not copy any Node code; run entirely via mount
# Install global tools (optional)
RUN npm install -g nodemon pm2 2>/dev/null || true

# Expose port (can be overridden by docker-compose)
EXPOSE 3090

# Default command, can be overridden by docker-compose
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
    # Restart policy
    restart: always
    # Port mapping
    ports:
      - "3090:3090"
    # Environment variables
    #environment:
      #- NODE_ENV=production
      # Add other environment variables as needed
      # - STEAM_USERNAME=your_username
      # - STEAM_PASSWORD=your_password
    volumes:
      # Path to mount project files
      - ./node_server_data:/app
      # Mount SteamCMD data directory (for persistent Steam data)
      - ./steamcmd_data:/root/Steam
    # Working directory
    working_dir: /app
    # Startup command (to override CMD in Dockerfile if needed)
    command: node --expose-gc server.js
    # Or use nodemon for development
    # command: nodemon --expose-gc server.js
    # Network mode
    networks:
      - app-network

# Custom network
networks:
  app-network:
    driver: bridge
```

4. Run the build command:
    ```
    docker-compose up -d
    ```
   If you're using a graphical NAS interface, manually select the path containing the dockerfile and docker-compose via the web interface
   
5. **Access the webpage**: Open `http://localhost:3090` in your browser

**Important Note**: Mounting the `/root/Steam` directory is essential for login state persistence!

## Features

### 1. Steam Account Login

#### How to Use
1. Click the user icon button in the top right corner of the page
2. Enter your Steam username, password, and Steam Guard verification code (if Steam Guard is enabled, check your mobile Steam app to approve the login request)
3. Click the "Login" button
4. After successful login, the button turns green, indicating a logged-in status

#### Logout
- Click the green user icon button
- Confirm logout to clear login status and persistent files

## Advanced Configuration

You can adjust tool behavior by setting environment variables:

| Environment Variable | Description | Default Value |
|----------|-------------|---------|
| `PORT` | Service port | `3090` |
| `HTTP_PROXY` | Proxy address (e.g., `http://127.0.0.1:7890`) | Automatically reads system proxy |
| `STEAM_CONFIG_DIR` | Steam configuration directory | `/root/Steam` |
| `STEAM_USERNAME` | Steam account (environment variable login) | - |
| `STEAM_PASSWORD` | Steam password | - |
| `STEAM_COUNTRY` | Store country code | - |
| `STEAM_LANG` | Language setting | `schinese` |

## Development Statement

This project was entirely built with the assistance of artificial intelligence. The publisher has not reviewed or written any line of code; any code similarities with other projects are purely coincidental. For learning and communication purposes only.
