/* 
route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
// pull in playback handlers
const {
  playHandler,
  pauseHandler,
  nextHandler,
  previousHandler,
} = require("./controller");
// pull in middleware routes for protection
const { validateTokenStatus } = require("../auth/middleware");

// define routes (play, pause, next, previous)
router.put("/play", validateTokenStatus, playHandler);
router.put("/pause", validateTokenStatus, pauseHandler);
router.post("/next", validateTokenStatus, nextHandler);
router.post("/previous", validateTokenStatus, previousHandler);

// export routes
module.exports = router;
