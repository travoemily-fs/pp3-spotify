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
- Grommet design framework
- Sequelize + MySQL for persistent data

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 🛠️ Getting Started

> ⚠️ Ports 3000 and 3001 **must** be open to host and run this program. Make sure that you don't have any other applications running on these ports _before_ you attempt launching.

- [Deploy locally](#-local-deployment)
  - [Individual deployment](#individual-deployment)
- [Deploy with Docker](#-docker-deployment)

This application requires the following software & packages installed on your device **_prior_** to use:

- Docker
- NodeJs
- Yarn
- NPM
- Chrome (recommended) _or_ Firefox, Opera GX, Edge, Safari

**For Mac OS users:**

- Brew
- Ngrok CLI
  - [Install instructions](https://ngrok.com/download)

You must also:
- [Reserve a subdomain in ngrok](https://dashboard.ngrok.com/cloud-edge/domains)
- Add that same URL to your Spotify app dashboard as your redirect URI
- Reference it inside your `backend/.env` and `frontend/.env`

## Local Deployment

After installing all prerequisites, you're now ready to set up your project environment with an `.env` file. You can accomplish this by following these easy steps:

1. Make a copy of the pre-existing `.env.dist` file
2. Rename that file to `.env` inside both `backend/` and `frontend/`

**Copy and paste version:**

```bash
cp backend/.env.dist backend/.env && cp frontend/.env.dist frontend/.env
```

Then update your environment values as follows:

### `backend/.env`

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=https://your-ngrok-subdomain.ngrok-free.app/api/auth/callback
JWT_SECRET=your_custom_secret
DB_NAME=pp3spotify
DB_USER=root
DB_PASS=example
```

### `frontend/.env`

```env
VITE_BACKEND_URL=https://your-ngrok-subdomain.ngrok-free.app
```

### Global ngrok config (optional)

To avoid restarting ngrok manually every time, create `~/.ngrok2/ngrok.yml` with:

```yaml
tunnels:
  playlister:
    addr: 3001
    proto: http
    hostname: your-ngrok-subdomain.ngrok-free.app
```

Then just run:

```bash
ngrok start playlister
```

## Docker Deployment

To start the full app:

```bash
docker compose up --build
```

Then separately in another terminal, run ngrok using:

```bash
ngrok start playlister
```

Once ngrok is running and both `.env` files point to the same subdomain, you can start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to log in.

## 💡 Extra Considerations

- Make sure that `3000` and `3001` are available before running the app
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

