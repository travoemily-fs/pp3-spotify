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
    await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // pass token to auth header w/ 204 successful request status
    res.status(204).send();
  } catch (err) {
    console.error("Play error:", err.response?.data || err.message);

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

  try {
    await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.status(204).send();
  } catch (err) {
    console.error("Pause error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to pause track.",
      details: err.response?.data || err.message,
    });
  }
};

const nextHandler = async (req, res) => {
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  try {
    await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.status(204).send();
  } catch (err) {
    console.error("Next error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to skip to next track.",
      details: err.response?.data || err.message,
    });
  }
};

const previousHandler = async (req, res) => {
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  try {
    await axios.post(
      "https://api.spotify.com/v1/me/player/previous",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.status(204).send();
  } catch (err) {
    console.error("Previous error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to skip to previous track.",
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
