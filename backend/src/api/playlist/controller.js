/* 
primary playlist routes are housed here: 
  createPlaylistHandler
  unfollowPlaylistHandler
  updatePlaylistHandler
  addTrackHandler
  removeTrackHandler
  sharePlaylistHandler
  faveTrackHandler
*/

// pull in needed imports
const axios = require("axios");

// begin playlist routes

// create playlist
const createPlaylistHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract playlist info from req.body (playlist name, description, public)
  const { name, description, public: isPublic } = req.body;
  // ensure a name is provided
  if (!name) {
    return res.status(400).json({
      error: "Playlist name is required.",
    });
  }
  // begin try/catch block to send req to spotify
  try {
    // make axios.post() req to playlist endpoint
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists`,
      {
        name,
        description,
        public: isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // respond w/ new playlist 201 new resource status
    res.status(201).json({
      playlistId: response.data.id,
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to create new playlist.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// unfollow playlist
const unfollowPlaylistHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract playlist id from req.params
  const { playlistId } = req.params;
  // begin try/catch block
  try {
    // make axios.delete() req to playlist followers endpoint
    await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // respond w/ success 204 no content status
    res.status(204).send();
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to unfollow playlist.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// update playlist
const updatePlaylistHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract new details (name, desc, public) from req.body
  const { playlistId, name, description, public: isPublic } = req.body;
  // if no playlistId is found...
  if (!playlistId) {
    // handle w/ a 400 bad request error
    return res.status(400).json({
      error: "PlaylistId is required.",
    });
  }
  // begin try/catch block
  try {
    // make axios.put() req to update playlist endpoint
    await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      { name, description, public: isPublic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // respond w/ a 200 successful request
    res.status(200).json({
      message: "Playlist updated successfully!",
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to update playlist.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// add to playlist
const addTrackHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract playlist_id and track_uri from req.body
  const { playlistId, trackUri } = req.body;
  // validate track input
  if (!playlistId || !trackUri) {
    // handle w/ 400 bad request error
    return res.status(400).json({
      error: "Both the playlistId and trackURI are required.",
    });
  }
  try {
    // make axios.post() req to playlist track endpoint
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // respond w/ a 201 success
    res.status(201).json({
      message: "Track added to playlist successfully!",
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to add track to playlist.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// remove from playlist
const removeTrackHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract playlist_id and track_uri from req.body
  const { playlistId, trackUri } = req.body;
  // validate track input
  if (!playlistId || !trackUri) {
    // handle w/ 400 bad request error
    return res.status(400).json({
      error: "Both the playlistId and trackUri are required.",
    });
  }
  try {
    // make axios.delete() req to playlist track endpoint
    await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        data: {
          tracks: [{ uri: trackUri }],
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // respond w/ a 200 success status
    res.status(200).json({
      message: "Track successfully removed from playlist.",
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to remove track from playlist.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// share playlist
const sharePlaylistHandler = async (req, res) => {
  // extract playlistId from params
  const { playlistId } = req.params;
  // verify that playlist exists
  if (!playlistId) {
    // handle w/ a 400 bad request error
    return res.status(400).json({
      error: "PlaylistId is required.",
    });
  }
  // begin try/catch block
  try {
    // create sharable url
    const shareUrl = `https://open.spotify.com/playlist/${playlistId}`;

    // respond w/ a 200 success status and share URL
    res.status(200).json({
      message: "Playlist share link successfully generated!",
      url: shareUrl,
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to generate share playlist link.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// favorite/like track
const faveTrackHandler = async (req, res) => {
  // get user's access token via req.user
  const token = req.user.accessToken;
  // fallback for token errors
  if (!token) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }
  // extract track ids from req.body
  const { trackIds } = req.body;

  // verify inputs like trackId, array input, and populated array
  if (!trackIds || !Array.isArray(trackIds) || trackIds.length === 0) {
    // handle w/ a 400 bad request error
    return res.status(400).json({
      error: "Trackids must be in a populated array.",
    });
  }
  // begin try/catch block
  try {
    // make axios.put() req to /me endpoint
    await axios.put(
      "https://api.spotify.com/v1/me/tracks",
      { ids: trackIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // respond w/ a 200 success status
    res.status(200).json({
      message: "Track(s) successfully added to favorites!",
    });
  } catch (err) {
    // handle w/ a 500 server error
    res.status(500).json({
      error: "Failed to favorite specified track/s.",
      // provides extra debugging info if available on what went wrong
      details: err.response?.data || err.message,
    });
  }
};

// export routes
module.exports = {
  createPlaylistHandler,
  unfollowPlaylistHandler,
  updatePlaylistHandler,
  addTrackHandler,
  removeTrackHandler,
  sharePlaylistHandler,
  faveTrackHandler,
};
