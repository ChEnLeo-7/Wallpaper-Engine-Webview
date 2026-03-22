# Wallpaper Engine Workshop Downloader

> Download Wallpaper Engine workshop wallpapers without login, with Steam account support and online video playback.

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## About This Fork

This project is forked from [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web), with personalized features added using AI programming. It has been tested on FNOS Docker and Windows, with possible minor issues. Note that some content below is AI-generated, and there may be small bugs, but they don't affect basic usage.

### Original Author's Note:
Note: Depending on user activity, video download may be the only option retained in the future if necessary. Otherwise, the current state will be maintained. [This project is for emergency entertainment use only and should not be considered a reason for piracy]

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

## Project Overview

This is a web-based Steam Workshop download tool designed specifically for Wallpaper Engine. It provides wallpaper search, online playback, and download functionality through a web interface.

**Core Advantage**: Leverages **SteamCMD's** anonymous login feature to download most public wallpaper resources without logging into a personal Steam account. (Author's note: In practice, anonymous download doesn't work for most items, so logging into a Steam account is recommended 😅)

## Fork Features

- **Steam Account Login**: Web-based Steam login to download restricted wallpapers
- **Online Video Playback**: Video wallpapers can be played directly in browser without download (cached on server)
- **Persistent Login**: Login once, auto-restore on restart, no repeated password entry (seems to have issues)
- **Auto-packaging Rules**:
  - **Scene/Application/Web wallpapers**: Auto-packaged as `.zip` after download
  - **Video wallpapers**: Direct extraction of original video files (.mp4, etc.), playable immediately
- **Zero Dependencies**: Uses only Node.js native modules, no `npm install` needed, ready to use

## Screenshots
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/2d18b9bf-e4c0-4c89-9749-09eb00c0ffb1" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/9ddaea0f-b8a5-4ca5-b62b-824384b8194b" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/b8b09a80-4d0e-4d12-b664-537b6c7ce0b0" />
<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/6caeb577-1585-44a7-9e1b-9dfce8357303" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/1d1699ac-7530-44a0-8209-350f1628f52c" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/c53e2283-583d-4d16-8ec6-d87e09d96a69" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/5486d689-658d-498d-9c08-febd6fe2d40a" />
<img width="439" height="957" alt="image" src="https://github.com/user-attachments/assets/4d39e199-6012-4de6-866c-94fd8ee5dd41" />

## Technical Architecture

- **Runtime Environment**: Node.js (>=16)
- **Core Downloader**: [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve's official command-line tool)
- **Frontend**: Vanilla JavaScript (no framework)
- **Backend**: Node.js native `http` module
- **Video Playback**: HTML5 Video API + Range request support

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or higher) is installed
2. **Network Access (region-dependent)**: Proxy requirement depends on your network environment. If you can directly access Steam Workshop, no proxy is needed; if access is restricted, enable system proxy or configure proxy environment variables
3. **SteamCMD**: The program will automatically try to find or download SteamCMD on startup. If it fails, check your network or manually download SteamCMD to the `steamcmd` directory

## Quick Start

`PS`: **First-time use requires online SteamCMD download. Click the user icon in the top right corner and enter your account credentials to trigger the download**

### Windows

1. **Download** the project code
2. **Start the service**:
   ```bash
   # Standard startup
   node server.js
   
   # Recommended: Enable manual garbage collection (optimizes memory management)
   node --expose-gc server.js
   ```
3. **Access the web interface**: Open `http://localhost:3090` in your browser

### Docker Deployment

1. Download the complete project code and create a `node_server_data` folder in your deployment path
2. Place all project files in the `node_server_data` folder
3. Create `dockerfile` and `docker-compose.yml` files in the parent folder of `node_server_data` with the following content

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

# Don't copy any Node code, run entirely through mounting
# Only install global tools (optional)
RUN npm install -g nodemon pm2 2>/dev/null || true

# Expose port (can be overridden by docker-compose)
EXPOSE 3090

# Default command, can be overridden by docker-compose
CMD ["node", "--expose-gc", "server.js"]
```

**docker-compose.yml**
```yaml
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
      # Mount project files path
      - ./node_server_data:/app
      # Mount SteamCMD data directory (for Steam data persistence)
      - ./steamcmd_data:/root/Steam
    # Working directory
    working_dir: /app
    # Startup command (override CMD in Dockerfile if needed)
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
    ```bash
    docker-compose up -d
    ```
   Or if you have a graphical NAS interface, manually select the path containing the dockerfile and docker-compose in the web interface

5. **Access the web interface**: Open `http://localhost:3090` in your browser

**Important**: You must mount the `/root/Steam` directory to enable login state persistence!

## Features

### 1. Steam Account Login

#### How to Use
1. Click the user icon button in the top right corner
2. Enter Steam username, password, and Steam Guard code (if Steam mobile authentication is enabled, check the mobile Steam app to approve the login request)
3. Click the "Login" button
4. After successful login, the button turns green showing logged-in status

#### Persistent Login (feature questionable)
- After successful login, credentials are automatically saved to the `/root/Steam` directory
- Login state auto-restores after service restart, no password re-entry needed
- Reuses logged-in session for downloads and video playback, no repeated logins
- **No mobile Steam login verification requests**

#### Logout
- Click the green user icon button
- After confirming logout, login state and persistent files are cleared

### 2. Online Video Playback

#### How to Use
1. Select "Video" type in the filter
2. Click a video wallpaper card to open details
3. Click the green "Play Video Online" button
4. Video player opens automatically and starts playing (first play may take a while, check server logs for details)

#### Technical Features
- Supports HTTP Range requests, seekable progress bar
- Video caching mechanism, played videos don't need re-download
- Supports multiple video formats: MP4, WebM, AVI, WMV, MKV, MOV, etc.
- Uses HTML5 native player, supports fullscreen, volume control, etc.

### 3. Video Cache Management

#### Set Cache Days
1. Click the settings button (gear icon) in the top right
2. Set cache days in "Video Cache Settings" (default 7 days)
3. Cache files older than the set days are automatically cleaned

#### Manual Cache Cleanup
1. Open settings panel
2. Click "Clear Cached Workshop Items Now" button
3. After confirmation, all cached video files are cleared (clears all workshop file cache in `/root/Steam/steamapps/431960/` directory)

## Advanced Configuration

You can adjust tool behavior by setting environment variables:

| Environment Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3090` |
| `HTTP_PROXY` | Proxy address (e.g., `http://127.0.0.1:7890`) | Auto-read system proxy |
| `STEAM_CONFIG_DIR` | Steam config directory | `/root/Steam` |
| `STEAM_USERNAME` | Steam account (env login) | - |
| `STEAM_PASSWORD` | Steam password | - |
| `STEAM_COUNTRY` | Store region code | - |
| `STEAM_LANG` | Language setting | `schinese` |

## API Endpoints

### Steam Login Related
- `POST /api/steam/login` - Login to Steam account
- `POST /api/steam/logout` - Logout
- `GET /api/steam/status` - Query login status

### Video Playback Related
- `GET /api/video/stream?id=<id>` - Video stream endpoint
- `POST /api/video/cache/clear` - Clear video cache
- `GET /api/video/cache/settings` - Get cache settings
- `POST /api/video/cache/settings` - Update cache settings

### Wallpaper Download Related
- `POST /api/steam/query` - Query wallpaper list
- `GET /api/steam/details?id=<id>` - Get wallpaper details
- `GET /api/download?id=<id>&title=<title>` - Download wallpaper

## Usage Tips

### Login State Persistence
```
First login → Credentials saved to /root/Steam → Service restart → Auto-restore login
```

### Avoid Repeated Logins
```
Persistent login → Reuse session for downloads → No password needed → No Steam Guard trigger
```

### Video Cache Optimization
```
First play → Download and cache → Subsequent plays → Use cache directly → Fast loading
```

## Troubleshooting

### Issue 1: Login state lost after service restart
**Solution**:
- Ensure Docker container has `/root/Steam` directory mounted
- Check if `/root/Steam/config/loginusers.vdf` file exists

### Issue 2: Mobile verification request during download
**Solution**:
- Confirm web login completed
- Check logs to confirm using `persistent login`
- Verify using shared directory (`shared dir: true`)

### Issue 3: Video won't play
**Solution**:
- Check network connection
- Review error messages in server logs
- Try clearing cache and replaying

### Issue 4: Video cache taking too much space
**Solution**:
- Adjust cache days in settings
- Use "Clear Cache Now" function
- Manually delete workshop cache files in `/steamapps/431960/` directory

## Changelog

### v4.3.0 (Latest)
- ✅ Fixed: Login state lost after web login and service restart
- ✅ Fixed: Repeated login triggers during download
- ✅ Fixed: Repeated Steam login requests on mobile
- ✅ Added: Video cache days setting
- ✅ Added: Manual cache clear function
- ✅ Optimized: Use shared directory to reuse Steam session
- ✅ Optimized: Clear persistent files on logout
- ✅ Optimized: Video auto-play function
- ✅ Updated: Settings button icon style

### v2.1.0
- ✨ Added: Steam account login feature
- ✨ Added: Online video playback feature
- 🎨 Optimized: UI/UX design
- 📝 Improved: Documentation

### v2.0.0
- Basic download functionality
- Wallpaper browsing and search
- Multi-language support

## Security Notes

1. **Password Not Stored**: After persistent login, password is immediately cleared from memory
2. **Session Reuse**: Uses Steam's official session mechanism, safe and reliable
3. **Local Verification**: All operations completed in local environment
4. **Auto Backup**: Config files automatically backed up on logout

## Development Statement

This project was built entirely with AI assistance. The publisher did not review or write any line of code; any similarity to other projects is coincidental. For learning and communication only.
