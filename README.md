# 🗂️📁 Portfolio Project #️⃣3️⃣

![Project Banner](https://www.dropbox.com/scl/fi/igyo59flz5or36hrb22ij/banner.png?rlkey=eeift1ygsp6w1quvfofud1biq&raw=1)

## 🧭 Directory

- [About](#-about)
- [Project Overview](#ℹ️-project-overview)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Extra Considerations](#-extra-considerations)
- [Project Links](#-project-links)
- [References](#-references)

## ✨ About

### ♑ Emily Travo

- 🪪 **ID:** 0005303522
- 📨 **Student Email:** EATravo@student.fullsail.edu
- ⌛ **Timezone:** PST

## ℹ️ Project Overview

This project utilizes the Spotify Web API to create a fully functional search application. It contains both frontend and backend capabilities, with detailed information on installation included in the [Getting Started](#%EF%B8%8F-getting-started) section below. The project uses JSON web tokens to allow users to log in using their Spotify credentials. Users can search for music by track title or artist and has the ability for users to create and share playlists.

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![Chrome OS](https://img.shields.io/badge/chrome%20os-3d89fc?style=for-the-badge&logo=google%20chrome&logoColor=white) ![Opera](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white) ![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white) ![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white) ![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Adobe Fonts](https://img.shields.io/badge/Adobe%20Fonts-000B1D.svg?style=for-the-badge&logo=Adobe%20Fonts&logoColor=white) ![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)

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

## Local Deployment

After installing all prerequisites, you're now ready to set up your project environment with an `.env` file. You can accomplish this by following these easy steps:

1. Make a copy of the pre-existing `.env.dist` file
2. Rename that file to `.env`

**Copy and paste version:**

```
cp .env.dist .env && vim .env
```

Once you've finished organizing your development environment, ensure that you have Yarn installed on your machine globally by opening a new Terminal window and entering the following command:

```
npm install -g yarn
yarn
```

For ease of use, this project is designed to run backend and frontend applications _concurrently_. Make certain you are inside the `root` project folder. You need to type this command into your terminal to deploy the fullstack **development build** of the application:

```
npm run dev
```

Alternatively, if you wish to deploy the fullstack **production build** of the application, ensure you are inside your project `root` folder. Next, type this command inside your terminal:

```
npm run start
```

With that, you're now able to run and interact with the application on `localhost:3000` in your browser of choice.

### Individual Deployment

If you prefer to run the backend and frontend applications _individually_ as opposed to launching each program concurrently, you can follow these steps:

**Run the backend server:**

```
code
```

**Run the frontend server:**

```
code
```

## Docker Deployment

If you would prefer to run the application through Docker, just run through these few steps:

## 💡 Extra Considerations

> content

## 🔗 Project Links

**General page views:**

- http://localhost:3000
  - runs the frontend portion of the application and the **primary link** to view the project.
- http://localhost:3001

  - runs the backend portion of the application and API

  **Endpoints page views:**

- link
  - about
- link
  - about

## 📚 References

> The following docs and sources were consulted during the development of this project:

- [Concurrently package](https://www.npmjs.com/package/concurrently)
- [Constructing Models with Sequelize](https://github.com/travoemily-fs/asl-space/tree/main/src/models)
  - [Additional help](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)
- [Ngrok package](https://ngrok.com/docs/getting-started/)
- [OAuth Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
  - [Additional help](https://www.geeksforgeeks.org/json-web-token-jwt/)
- [Spotify Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Wait-for-it.sh script](https://github.com/vishnubob/wait-for-it)
  - [Additional help](https://medium.com/@krishnaregmi/wait-for-it-docker-compose-f0bac30f3357)

## Components

> The following UI components were used to create this project:

- [Music Loader](https://codepen.io/antoniasymeonidou/pen/bGawzLo)
