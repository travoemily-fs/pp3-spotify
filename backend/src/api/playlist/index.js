/* 
playlist route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
// pull in save track handler
const { saveTrackHandler } = require("./controller");
// pull in middleware
const { validateTokenStatus } = require("../auth/middleware");

// define routes
router.post("/", validateTokenStatus, saveTrackHandler);

// export routes
module.exports = router