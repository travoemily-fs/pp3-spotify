/* 
primary playback routes are housed here:
playHandler
pauseHandler
nextHandler
previousHandler
*/

// pull in needed imports
const axios = require("axios");

// begin routes

// start/resume playback
const playHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // begin try/catch block to send req to spotify
  try {
    // user axios.put() to hit spotify play endpoint
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // pass token to auth header w/ 204 successful request status
    res.status(204).send();
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to start/resume playback.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// pause playback
const pauseHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // begin try/catch block to send req to spotify
  try {
    // user axios.put() to hit spotify pause endpoint
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // pass token to auth header w/ 204 successful request status
    res.status(204).send();
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to pause track.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

const nextHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // begin try/catch block to send req to spotify
  try {
    // user axios.post() to hit spotify next endpoint
    const response = await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // pass token to auth header w/ 204 successful request status
    res.status(204).send();
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to skip to next track.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

const previousHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // begin try/catch block to send req to spotify
  try {
    // user axios.post() to hit spotify previous endpoint
    const response = await axios.post(
      "https://api.spotify.com/v1/me/player/previous",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // pass token to auth header w/ 204 successful request status
    res.status(204).send();
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to skip to previous track.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// export routes
module.exports = {
  playHandler,
  pauseHandler,
  nextHandler,
  previousHandler,
};
