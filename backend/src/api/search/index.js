/* 
route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
// pull in search handler
const { searchHandler } = require("./controller");

// define routes
router.get("/", searchHandler);

// export routes
module.exports = router;