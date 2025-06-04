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
} = require("./controller");
// pull in middleware
const { validateTokenStatus } = require("../auth/middleware");

// define routes
router.post("/new", validateTokenStatus, createPlaylistHandler);
router.post("/add", validateTokenStatus, addTrackHandler);
router.delete("/remove", validateTokenStatus, removeTrackHandler);
router.put("/update", validateTokenStatus, updatePlaylistHandler);
router.delete(
  "/unfollow/:playlistId",
  validateTokenStatus,
  unfollowPlaylistHandler
);
router.get("/share", validateTokenStatus, sharePlaylistHandler);
router.put("/fave", validateTokenStatus, faveTrackHandler);

// export routes
module.exports = router;
