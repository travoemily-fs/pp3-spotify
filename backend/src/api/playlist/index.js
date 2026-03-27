/* 
playlist route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();

// pull in save track handler
const {
  createPlaylistHandler,
  unfollowPlaylistHandler,
  updatePlaylistHandler,
  addTrackHandler,
  removeTrackHandler,
  sharePlaylistHandler,
  faveTrackHandler,
  getPlaylistsHandler, // fetch all user playlists
} = require("./controller");

// pull in middleware
const { validateTokenStatus } = require("../auth/middleware");

// define routes

// 🔥 fetch current user's playlists
router.get("/", validateTokenStatus, getPlaylistsHandler);

// create new playlist
router.post("/new", validateTokenStatus, createPlaylistHandler);

// add track to playlist
router.post("/add", validateTokenStatus, addTrackHandler);

// remove track from playlist
router.delete("/remove", validateTokenStatus, removeTrackHandler);

// update playlist details
router.put("/update", validateTokenStatus, updatePlaylistHandler);

// unfollow playlist
router.delete(
  "/unfollow/:playlistId",
  validateTokenStatus,
  unfollowPlaylistHandler,
);

// generate share link for playlist
router.get("/share/:playlistId", validateTokenStatus, sharePlaylistHandler);

// favorite (like) track
router.put("/fave", validateTokenStatus, faveTrackHandler);

// export routes
module.exports = router;
