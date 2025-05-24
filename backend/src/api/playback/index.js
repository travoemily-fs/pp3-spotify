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
} = require("./controller")
// pull in middleware routes for protection
const { validateTokenStatus } = require("../auth/middleware");

// define routes (play and pause are PUT, skip to rec is a POST)
router.put("/play", validateTokenStatus, playHandler);
router.put("/pause", validateTokenStatus, pauseHandler);


// export routes
module.exports = router;