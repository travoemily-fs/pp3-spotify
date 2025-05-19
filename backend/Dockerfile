FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

EXPOSE 3001

