/* 
primary playback routes are housed here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
const axios = require("axios");
// pull in user model
const { User } = require("../../db");

// begin routes

// start/resume playback
const playHandler = async (req, res) => {
  // TODO: send put request to spotify /play endpoint w/ user token
  // get user's access token via req.user
  // begin try/catch block to wrap :
  // user axios.put() to hit https://api.spotify.com/v1/me/player/play
  // pass token to auth header
};

// pause playback
const pauseHandler = async (req, res) => {
  // TODO: send put request to spotify /pause endpoint w/ user token
  // get user's access token via req.user
  // begin try/catch block to wrap :
  // user axios.put() to hit https://api.spotify.com/v1/me/player/pause
  // pass token to auth header
};

// export routes
module.exports = {
  playHandler,
  pauseHandler,
};
