// pull in & define backend modules
const jwt = require("jsonwebtoken");
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User } = require("../../db");

// pull in & define spotify client info
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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
  });
  // create authorization url using params defined above
  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  // redirect user
  res.redirect(authUrl);
});

// callback route
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
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
    // checks for missing access tokens
    if (!access_token) {
      // throws 400 bad request error
      return res.status(400).send("No access token received.");
    }
    console.log("Access token granted:", access_token);

    // fetch user data
    const profileData = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // extract the needed fields
    const { id: spotifyId, email } = profileData.data;
    // create user / add user to my database
    const [user, created] = await User.findOrCreate({
      where: { spotifyId },
      defaults: {
        email,
        accessToken: access_token,
        refreshToken: refresh_token,
      },
    });
    // updates tokens after repeated logins
    if (!created) {
      await user.update({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    }
    // define payload
    const payload = {
      id: user.id,
      spotifyId: user.spotifyId,
      email: user.email,
    };

    // create jwt with sign() method w/ payload + jwt secret
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // send token to spotify TESTING ONLY
    res.json({ token });

    // sends success redirect response PRODUCTION ONLY
    // res.redirect(`/dashboard?token=${token}`);
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

// user 'me' route
router.get("/me", (req, res) => {
  // grab auth header
  const authHeader = req.headers.authorization;
  // if no token, deny user access
  if (!authHeader) {
    // handle w/ a bad credentials 401 error
    return res.status(401).json({
      error: "No token provided",
    });
  }
  // double check that auth header sent token with expected format
  if (!authHeader.startsWith("Bearer")) {
    // handle w/ a bad credentials 401 error
    return res.status(401).json({
      error: "Invalid Authorization Header format.",
    });
  }
  // separate token from 'bearer' to grab the actual token value
  const token = authHeader.split(" ")[1];
  // handle an 'undefined' error, or auth header with no token
  if (!token) {
    // handle w/ a bad credentials 401 error
    return res.status(401).json({
      error: "Token not found in Authorization Header",
    });
  }

  // begin try + catch block for verifying token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // respond if user is verified
    res.json({
      user: verified,
    });
  } catch (err) {
    // handle w/ a 403 forbidden error
    res.status(403).json({
      error: "Invalid token.",
      // provides extra debugging info on what went wrong
      details: err.message,
    });
  }
});

module.exports = router;
