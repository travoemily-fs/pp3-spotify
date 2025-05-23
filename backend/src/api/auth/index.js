/* 
route entry points live here
*/

// pull in needed imports
const express = require("express");
const router = express.Router();
// pull in route handlers
const {
  loginHandler,
  callbackHandler,
  meHandler,
  refreshHandler,
} = require("./controller");

// define routes
router.get("/login", loginHandler);
router.get("/callback", callbackHandler);
router.get("/me", meHandler);
router.post("/refresh", refreshHandler);

// export routes
module.exports = router;
