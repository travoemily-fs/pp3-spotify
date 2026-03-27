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
      },
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
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  const { playlistId } = req.params;

  try {
    await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: "Failed to unfollow playlist.",
      details: err.response?.data || err.message,
    });
  }
};

// update playlist
const updatePlaylistHandler = async (req, res) => {
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  const { playlistId, name, description, public: isPublic } = req.body;

  if (!playlistId) {
    return res.status(400).json({
      error: "PlaylistId is required.",
    });
  }

  try {
    await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      { name, description, public: isPublic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(200).json({
      message: "Playlist updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update playlist.",
      details: err.response?.data || err.message,
    });
  }
};

// add to playlist
const addTrackHandler = async (req, res) => {
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  const { playlistId, trackUri } = req.body;

  if (!playlistId || !trackUri) {
    return res.status(400).json({
      error: "Both the playlistId and trackURI are required.",
    });
  }

  try {
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
      },
    );

    res.status(201).json({
      message: "Track added to playlist successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add track to playlist.",
      details: err.response?.data || err.message,
    });
  }
};

// remove from playlist
const removeTrackHandler = async (req, res) => {
  const token = req.user.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  const { playlistId, trackUri } = req.body;

  if (!playlistId || !trackUri) {
    return res.status(400).json({
      error: "Both the playlistId and trackUri are required.",
    });
  }

  try {
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
      },
    );

    res.status(200).json({
      message: "Track successfully removed from playlist.",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to remove track from playlist.",
      details: err.response?.data || err.message,
    });
  }
};

// share playlist
const sharePlaylistHandler = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).json({
      error: "PlaylistId is required.",
    });
  }

  try {
    const shareUrl = `https://open.spotify.com/playlist/${playlistId}`;

    res.status(200).json({
      message: "Playlist share link successfully generated!",
      url: shareUrl,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to generate share playlist link.",
      details: err.response?.data || err.message,
    });
  }
};

// favorite/like track
const faveTrackHandler = async (req, res) => {
  // extract track ids from req.body
  const { trackIds } = req.body;

  // debug log to confirm receipt of track IDs
  console.log("faveTrackHandler called");
  console.log("Track IDs received:", trackIds);

  // get token directly from JWT (NO DB LOOKUP 🚫)
  const token = req.user.accessToken;

  // fallback for token errors
  if (!token) {
    return res.status(401).json({
      error: "Invalid or missing access token.",
    });
  }

  // verify inputs like trackId, array input, and populated array
  if (!trackIds || !Array.isArray(trackIds) || trackIds.length === 0) {
    return res.status(400).json({
      error: "Trackids must be in a populated array.",
    });
  }

  // begin try/catch block
  try {
    await axios.put(
      "https://api.spotify.com/v1/me/tracks",
      { ids: trackIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(200).json({
      message: "Track(s) successfully added to favorites!",
    });
  } catch (err) {
    console.error("Favorite error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to favorite specified track/s.",
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
