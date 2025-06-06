# 🗂️📁 Portfolio Project #️⃣3️⃣ – Playlister 🎵

![Project Banner](https://www.dropbox.com/scl/fi/igyo59flz5or36hrb22ij/banner.png?rlkey=eeift1ygsp6w1quvfofud1biq&raw=1)

## 🧭 Directory

- [About](#-about)
- [Project Overview](#ℹ️-project-overview)
- [Getting Started](#-getting-started)
- [Docker Deployment](#-docker-deployment)
- [Extra Considerations](#-extra-considerations)
- [Project Links](#-project-links)
- [References](#-references)

## ✨ About

### ♑ Emily Travo

- 🪪 **ID:** 0005303522
- 📨 **Student Email:** EATravo@student.fullsail.edu
- ⌛ **Timezone:** PST

## ℹ️ Project Overview

This project utilizes the Spotify Web API to create a fullstack application that lets users search for tracks, albums, and artists, authenticate via Spotify, and build custom playlists.

It uses:

- JSON Web Tokens for authentication
- Node.js + Express on the backend
- React + Vite on the frontend
- Sequelize + MySQL for persistent data

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 🛠️ Getting Started

This application requires the following software installed on your machine:

- Docker & Docker Compose
- Node.js & npm (for frontend)
- Ngrok CLI
- A Spotify Developer account with a registered app

## 🐳 Docker Deployment

### 1. Clone the repo

```
git clone https://github.com/your-username/pp3-spotify.git
cd pp3-spotify
```

### 2. Create environment files

Create a `.env` file inside `backend/`:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=https://<your-ngrok-url>.ngrok-free.app/api/auth/callback
JWT_SECRET=some_secret_here
DB_NAME=pp3spotify
DB_USER=root
DB_PASS=example
```

Create a `.env` file inside `frontend/`:

```
VITE_BACKEND_URL=https://<your-ngrok-url>.ngrok-free.app
```

### 3. Start the backend via Docker

```
docker compose up --build
```

### 4. Start ngrok

```
ngrok http 3001
```

Use the generated URL in both your Spotify Developer dashboard **and** your `.env` files.

### 5. Start the frontend

```
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000 and click "Log In".

## 💡 Extra Considerations

- Ports `3000` and `3001` must be available before running the app
- The backend connects to MySQL via Docker's internal network alias `mysql_db`
- If you close ngrok, you'll need to update `.env` and the Spotify redirect URI again

## 🔗 Project Links

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Spotify Dashboard: https://developer.spotify.com/dashboard

## 📚 References

- [Spotify Auth Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Ngrok Guide](https://ngrok.com/docs)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Wait-for-it Script](https://github.com/vishnubob/wait-for-it)
- [JWT Reference](https://jwt.io/introduction)

## 🎨 Components

- [Animated Background by @P1N2O](https://codepen.io/P1N2O/pen/pyBNzX)
- [Grommet UI Components](https://v2.grommet.io/components)
- React Icons & Custom CSS Modules
