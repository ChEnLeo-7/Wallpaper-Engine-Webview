# Wallpaper Engine Creative Workshop Download Tool

> A web-based Wallpaper Engine workshop downloader with Steam account login and online video playback support.

> [!CAUTION]
>
> # This Project Is Discontinued
>
> Development has ceased. All future updates and development resources have been transferred to [WallHub2.0](https://github.com/ChEnLeo-7/WallHub2.0)

<p align="center">
  <a href="./README.en.md">English</a>
   · 
  <a href="./README.md">简体中文</a>
</p>

## References

> Referenced projects:
> - https://github.com/0ran/wallpaper-engine-download-web (original author)  
> - https://github.com/TulpaMavis/wallpaper-engine-download-web (second modification & Docker adaptation)

This project is forked from [0ran/wallpaper-engine-download-web](https://github.com/0ran/wallpaper-engine-download-web), then further customized with AI-assisted programming based on [TulpaMavis/wallpaper-engine-download-web](https://github.com/TulpaMavis/wallpaper-engine-download-web) to add some personal preferences. It has been tested on FNOS Docker and Windows. The Docker environment is slightly more compatible than Windows, though some minor omissions may exist. Note that parts of the content below are AI-generated; there are still some incomplete features and small bugs, but they generally do not affect usability.

## Introduction

This is a web-based Steam Workshop download tool designed specifically for Wallpaper Engine. It provides wallpaper search, online playback, and download functionality through a web interface.

**Core advantages**: Once deployed on the server, clients can stream Wallpaper Engine video projects directly in a browser without downloading, or download them as packages. The server supports Steam account login, Steam API Key integration (for more complete wallpaper listings), and download queue management.

## Mod Features

The original project's features are not repeated here; this fork adds:

- **👤Steam web account login**: Direct login via the web interface with email verification code support, enabling download of restricted wallpapers and persistent login state.
- **🔑Steam API support**: Input and save your own Steam API key, enable it with a button click, and refresh the list to retrieve the full wallpaper catalog.
- **📺Online video playback**: Video wallpapers can be played directly in the browser without downloading on the viewing device (the server downloads and streams to the client; cache can be cleared).
- **⬇️Download queue management**: Add Wallpaper items to background download, direct playback, or package download. Progress for all operations except packaging is displayed, and you can manage completed items.
- **📦Package download after subscription**:
  - **Scene/Application/Web wallpapers**: Click "Subscribe" to download to the server, package as `.zip`, and send to the client; click "Add to background download" to only save locally on the server (useful for batch downloads).
  - **Video wallpapers**: Click "Subscribe" to download, package as `.zip`, and send to the client; click "Watch later" to save locally on the server (for batch downloads); click "Play video" to directly load the playback interface with progress display.
- **🔃Web server restart (Docker only)**: Restart the server from the settings page.
- **⭐️Page animations**: Added visual effects on some interfaces for a richer experience.

## Screenshots

<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/a7172104-95f1-49f9-a9e2-9773dfed78d4" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/2aaafca8-4a49-41ae-a375-a9233999b124" />
<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/6b3b6a24-7368-4f61-b15b-fbbc40aa908c" />
</br></br>
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/7b30b78f-0bdc-428a-a9a1-c199afb3d910" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/1d1a09b5-9b4d-4792-88f8-9b8d616261f4" />
<img width="32%" height="32%" alt="image" src="https://github.com/user-attachments/assets/0a6c37fe-3664-4820-a187-8f67990b7a75" />
</br></br>

## Technical Architecture

- **Runtime**: Node.js (>=16)
- **Core downloader**: [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) (Valve official command-line tool)
- **Frontend**: Vanilla JavaScript (no framework)
- **Backend**: Node.js native `http` module
- **Video playback**: HTML5 Video API + Range request support

## Prerequisites

1. **Node.js**: Ensure Node.js (v16 or higher) is installed on your system.
2. **Network access (region-dependent)**: A proxy may be required depending on your network environment. If you can directly access Steam Workshop in your region, no proxy is needed. Otherwise, enable system proxy or configure proxy environment variables.
> For Docker/Linux users who need proxy-free access, you can download [Steamcommunity_302](https://github.com/TulpaMavis/wallpaper-engine-download-web/tree/main/wallpaper-webview/Steamcommunity_302) from the related project. Further configuration can be found in [docker-compose.yml](https://github.com/TulpaMavis/wallpaper-engine-download-web/blob/main/wallpaper-webview/docker-compose.yml).
3. **SteamCMD**: On program startup or when calling SteamCMD, the tool will automatically attempt to locate or download SteamCMD. If it fails, check your network or manually download SteamCMD and place it in the `steamcmd` directory.

## Quick Start

### Windows

1. **Download** this repository.
2. **Start the server**:
   ```bash
   node server.js
   ```
3. **Access the web interface**: Open `http://localhost:3090` in your browser.

### Docker Deployment

1. Download the full project code and create a folder named `node_server_data` in your deployment path.
2. Place all project files into the `node_server_data` folder.
3. In the parent directory of `node_server_data`, create `Dockerfile` and `docker-compose.yml` with the following content.

**Dockerfile**

```dockerfile
# Base image
FROM node:18-slim

# Install SteamCMD dependencies, zip, and unzip
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

# Do not copy any Node code; run entirely via volume mount
# Install global tools (optional)
RUN npm install -g nodemon pm2 2>/dev/null || true

# Expose port (can be overridden by docker-compose)
EXPOSE 3090

# Default command (can be overridden by docker-compose)
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
    restart: always
    ports:
      - "3090:3090"
    #environment:
      #- HTTP_PROXY=your_http_proxy_address
      # Add other environment variables as needed
      # - STEAM_USERNAME=your_username
      # - STEAM_PASSWORD=your_password
    volumes:
      # Mount project files
      - ./node_server_data:/app
      # Mount SteamCMD data directory (for persistent Steam data)
      - ./steamcmd_data:/root/Steam
    working_dir: /app
    # Override CMD from Dockerfile if needed
    command: node server.js
    # Use nodemon for development
    # command: nodemon server.js
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

5. **Access the web interface**: Open `http://localhost:3090` in your browser.

**Important**: Mounting the `/root/Steam` directory is required for persistent login status!

## Feature Details

### 1. Steam Account Login

#### How to use
1. Click the user icon button in the top right corner.
2. Enter your Steam username, password, and Steam Guard verification code (if Steam Guard is enabled via mobile, approve the login request in the mobile Steam app).
3. Click "Login".
4. Upon successful login, the button turns green and displays the logged-in status.

#### Logout
- Click the user card in settings to log out.
- After confirmation, the login state and persistent files are cleared.

## Advanced Configuration

You can adjust the tool's behavior by setting environment variables:

| Environment Variable | Description | Default |
|----------------------|-------------|---------|
| `PORT` | Service port | `3090` |
| `HTTP_PROXY` | Proxy address (e.g., `http://127.0.0.1:7890`) | Auto-reads system proxy |
| `STEAM_CONFIG_DIR` | Steam configuration directory | `/root/Steam` |
| `STEAM_USERNAME` | Steam account (environment variable login) | - |
| `STEAM_PASSWORD` | Steam password | - |
| `STEAM_COUNTRY` | Store region code | - |
| `STEAM_LANG` | Language setting | `schinese` |

## Development & Disclaimer

> This project was entirely built with AI assistance. The publisher has not reviewed or written any line of code; if there are similarities with other projects, it's because I copied them. For learning and exchange purposes only. Please delete within 24 hours.

1. **Unofficial tool**: This is a **third-party unofficial tool** and is **not affiliated** with Wallpaper Engine official, Steam, or Valve Corporation.
2. **Personal use only**: This tool is **for personal learning, research, and technical exchange only**; it must not be used for any commercial purposes.
3. **Respect copyright**: All workshop content copyrights belong to their original authors. Please:
   - Only download content you have **subscribed to** or have **authorized access to**.
   - Do not **redistribute or share** downloaded content.
   - Support original creators by **subscribing and upvoting** wallpapers on Steam.
4. **Self-use principle**: This tool is developed solely to **simplify personal download workflows**. By using this tool, you **agree**:
   - To only download wallpapers you have **subscribed to**.
   - Not to perform **bulk downloads** or **scraping**.
   - Not to **bypass any paywalls or restrictions**.
5. **Use at your own risk**: Using this tool may violate Steam's Terms of Service. You assume all risks; the developer **assumes no liability**.
6. **Prohibited abuse**: **Strictly prohibited** to use this tool for:
   - Downloading copyrighted or unauthorized content.
   - Commercial purposes.
   - Infringing on others' intellectual property.
   - Violating local laws and regulations.
7. **Cease use**: If you do not agree to the above terms, **please stop using this tool immediately**.

*This project is for technical demonstration only. Please delete it within 24 hours after download and support the official version.*
