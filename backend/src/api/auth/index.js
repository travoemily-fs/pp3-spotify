// pull in & define backend modules
const express = require("express");
const axios = require("axios");
const router = express.Router();

// pull in & define spotify client info
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// login route
router.get("/login", (req, res) => {
  // define spotify scope
  const scope = "user-read-private user-read-email";
  // use URLSearchParams to build out query string
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    state,
  });
  // create authorization url using params defined above
  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  // redirect user
  res.redirect(authUrl);
});

// callback route
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  // check for state, redirect if state isn't matching
  if (!state) {
    return res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  }
  // set up access token request
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });
  // declare authorization header w/ client info, use buffer method to encode binary data to base64
  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );
  // set up response token as an URL-encoded string
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        // define content type and send authHeader through
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
      }
    );
    // get spotify access_token & refresh_token if initial response passes
    const { access_token, refresh_token } = response.data;
    console.log("Access token granted:", access_token);
    // send success response
    res.send("Authorization successful; tokens received.");
  } catch (err) {
    // check for response data from spotify to log, otherwise print generic error
    console.error(
      "Token exchange error encountered:",
      err.response?.data || err.message
    );
    // throw 500 error status
    res.status(500).send("Failed to exchange given code for token.");
  }
});

module.exports = router;
