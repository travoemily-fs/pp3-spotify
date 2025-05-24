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
// pull in middleware routes for protection
const { validateTokenStatus } = require("./middleware");

// define routes
router.get("/login", loginHandler);
router.get("/callback", callbackHandler);
router.get("/me", validateTokenStatus, meHandler);
router.post("/refresh", validateTokenStatus, refreshHandler);

// export routes
module.exports = router;
