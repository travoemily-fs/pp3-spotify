/* 
search route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
// pull in search handler
const { searchHandler } = require("./controller");
// pull in middleware routes for protection
const { validateTokenStatus } = require("../auth/middleware");

// define routes
router.get("/", validateTokenStatus, searchHandler);

// export routes
module.exports = router;