# Wallpaper Engine Workshop Download Tool

> Download Wallpaper Engine workshop wallpapers without login, supports Steam account login and online video playback.

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## Notes from the Modifying Author

Reference projects:  
https://github.com/0ran/wallpaper-engine-download-web  
https://github.com/TulpaMavis/wallpaper-engine-download-web

This project is forked from the upstream project [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web). Using AI-assisted programming, I've added some personalized features based on my own preferences. It has been tested on FNOS Docker and Windows, with Docker environment having slightly better compatibility than Windows (though there may be minor omissions). Note that parts of the content below were written by AI. There are still some imperfections and small bugs, but they don't fundamentally affect usage.

### Original Author's Statement:
Note: Depending on user behavior, if necessary, only video download options will remain in the future. Otherwise, the current state will be maintained. [This project is for emergency entertainment use only. Do not use it as a reason for cracking.]

## Project Badges

[![version](https://img.shields.io/badge/version-4.3.0-3fb950?style=flat-square)](https://semver.org/)
[![node](https://img.shields.io/badge/node-%3E%3D16-43853d?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![runtime](https://img.shields.io/badge/runtime-Node.js-5fa04e?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/en/about)
[![downloader](https://img.shields.io/badge/downloader-SteamCMD-1b2838?style=flat-square&logo=steam&logoColor=white)](https://developer.valvesoftware.com/wiki/SteamCMD)
[![frontend](https://img.shields.io/badge/frontend-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![dependency](https://img.shields.io/badge/dependency-zero-0ea5e9?style=flat-square)](https://nodejs.org/docs/latest/api/)

## Tech Stack

<p>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" /></a>
  <a href="https://developer.valvesoftware.com/wiki/SteamCMD" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/steam/ffffff" alt="SteamCMD" width="48" height="48" /></a>
  <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer"><img src="https://skillicons.dev/icons?i=js,html,css" alt="JavaScript, HTML, CSS" /></a>
</p>

## Project Introduction

This project is a web-based Steam Workshop download tool designed specifically for Wallpaper Engine. It provides wallpaper search, online playback, and download functionality through a web interface.

**Core Advantage**: Leverages SteamCMD's anonymous login feature, allowing download of most public wallpaper resources without logging into a personal Steam account. (Author's PS: In practice, anonymous downloads mostly don't work. Better to log in to your Steam account 😅)

## Modification Features

The original project's features are not repeated here:

- **Steam Web Account Login**: Supports logging into Steam account directly on the webpage, with email verification code support, allowing download of permission-required wallpapers and persistent login state
- **Steam API Support**: Supports entering your own Steam API key, saving it, and enabling it with a button click. After enabling, the complete Wallpaper list will be available when refreshing the list
- **Online Video Playback**: Video wallpapers can be played directly in the browser without downloading on the viewing device (the server downloads and streams to the client; cache can be cleared)
- **Download Queue Management**: You can add Wallpaper items to background download, direct playback, or packaged download. Except for packaging, all operation progress will be displayed here. After completion, you can manage them
- **Packaged Download After Subscription**:
  - **Scene/Program/Web page wallpapers**: When clicking "Subscribe", downloads to server and packages into `.zip` archive sent to client for download; when clicking "Add to Background Download", only downloads to server locally (useful for batch downloads)
  - **Video wallpapers**: When clicking "Subscribe", downloads to server and packages into `.zip` archive sent to client; when clicking "Watch Later", only downloads to server locally (useful for batch downloads); when clicking "Play Video", directly loads playback interface and shows progress
- **Web Server Restart (Docker only)**: You can restart the server in settings

## Screenshots

<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/a7172104-95f1-49f9-a9e2-9773dfed78d4" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/2aaafca8-4a49-41ae-a375-a9233999b124" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/6b3b6a24-7368-4f61-b15b-fbbc40aa908c" />
</br></br>
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/f79a6d0e-9c40-46ff-8f12-931e2a79fbb9" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/69728bf1-8c0f-424d-bf81-4011a10e1409" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/029cc462-993c-4e28-88a9-e2ac3112ce24" />
</br></br>

## Technical Architecture

- **Runtime**: Node.js (>=16)
- **Core Downloader**: [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve official command-line tool)
- **Frontend**: Vanilla JavaScript (framework-free)
- **Backend**: Node.js native `http` module
- **Video Playback**: HTML5 Video API + Range request support

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or higher) is installed on your device
2. **Network Access (varies by region)**: Whether a proxy is needed depends on your network environment. If you have direct access to Steam Workshop in your region, no proxy is needed; if access is restricted, enable system proxy or configure proxy environment variables
3. **SteamCMD**: When starting/calling SteamCMD, the program will automatically attempt to locate or download SteamCMD. If it fails, check your network or manually download SteamCMD and place it in the `steamcmd` directory

## Quick Start

### Windows

1. **Download** this project's code
2. **Start the service**:
   ```bash
   node server.js
   ```
3. **Access the webpage**: Open `http://localhost:3090` in your browser

### Docker Deployment

1. Download the complete project code. Create a new folder named `node_server_data` in your deployment path
2. Place all project files in the `node_server_data` folder
3. Then, in the parent folder of `node_server_data`, create new files `dockerfile` and `docker-compose.yml` with the content below

**Dockerfile**

```dockerfile
# Base image
FROM node:18-slim

# Install SteamCMD dependencies, zip and unzip
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

# Don't copy any Node code, run entirely via mounting
# Install global tools only (optional)
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
      #- HTTP_PROXY=your_http_proxy_address
      # Add other environment variables as needed
      # - STEAM_USERNAME=your_username
      # - STEAM_PASSWORD=your_password
    volumes:
      # Path to mount project files
      - ./node_server_data:/app
      # Mount SteamCMD data directory (for Steam data persistence)
      - ./steamcmd_data:/root/Steam
    # Working directory
    working_dir: /app
    # Start command (if you need to override the CMD in Dockerfile)
    command: node server.js
    # Or use nodemon for development
    # command: nodemon server.js
    # Network mode
    network_mode: host
    deploy:
      resources:
        limits:
          #cpus: '2'
          memory: 500M
```

4. Run the build command:
   ```
   docker-compose up -d
   ```

5. **Access the webpage**: Open `http://localhost:3090` in your browser

**Important Note**: You must mount the `/root/Steam` directory to achieve login state persistence!

## Feature Description

### 1. Steam Account Login

#### How to Use
1. Click the user icon button in the top-right corner of the page
2. Enter Steam username, password, and Steam Guard verification code (if Steam mobile verification is enabled, check the mobile Steam app to approve the login request)
3. Click the "Login" button
4. Upon successful login, the button turns green, indicating logged-in status

#### Logout
- Click the user card in settings to log out of the account
- After confirming logout, the login state and persistence files are cleared

## Advanced Configuration

You can adjust tool behavior by setting environment variables:

| Environment Variable | Description | Default Value |
|----------|-------------|---------|
| `PORT` | Service port | `3090` |
| `HTTP_PROXY` | Proxy address (e.g., `http://127.0.0.1:7890`) | Automatically reads system proxy |
| `STEAM_CONFIG_DIR` | Steam config directory | `/root/Steam` |
| `STEAM_USERNAME` | Steam account (environment variable login) | - |
| `STEAM_PASSWORD` | Steam password | - |
| `STEAM_COUNTRY` | Store country code | - |
| `STEAM_LANG` | Language setting | `schinese` |

## Development Statement

This project was entirely built with AI assistance. The publisher has not reviewed or written a single line of code content; if there are code similarities with other projects, it's because I copied them. For learning and communication purposes only.
```
