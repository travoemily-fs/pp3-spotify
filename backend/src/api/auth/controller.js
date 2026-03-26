/* 
primary routes live here:
loginHandler
callbackHandler
meHandler
*/

// pull in needed imports
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { createToken, verifyToken, getRefreshToken } = require("./utils");

// pull in env variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// begin routes

// login handler
const loginHandler = (req, res) => {
  console.log("LOGIN ROUTE HIT");

  console.log("CLIENT_ID:", CLIENT_ID);
  console.log("REDIRECT_URI:", REDIRECT_URI);

  // guard clause to prevent hanging
  if (!CLIENT_ID || !REDIRECT_URI) {
    console.error("Missing Spotify environment variables");

    return res.status(500).json({
      error: "Server misconfigured",
      details: {
        CLIENT_ID: CLIENT_ID ? "OK" : "MISSING",
        REDIRECT_URI: REDIRECT_URI ? "OK" : "MISSING",
      },
    });
  }

  try {
    // define spotify scope
    const scope = "user-library-modify user-read-private user-read-email";

    // build query string
    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    console.log("Redirecting to Spotify:", authUrl);

    return res.redirect(authUrl);
  } catch (err) {
    console.error("Login handler error:", err.message);

    return res.status(500).json({
      error: "Login failed",
      details: err.message,
    });
  }
};

// callback handler
const callbackHandler = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64",
  );

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    const { access_token, refresh_token } = response.data;

    if (!access_token) {
      return res.status(400).send("No access token received.");
    }

    console.log("Access token granted:", access_token);

    // fetch spotify user profile
    const profileData = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id: spotifyId, email } = profileData.data;

    // TEMPORARY: skip database persistence until deployed DB is working
const token = createToken({
  id: spotifyId,
  spotifyId,
  email: email || "no-email@spotify.local",
  accessToken: access_token, 
  refreshToken: refresh_token,
});

    console.log("Generated JWT:", token);

    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  } catch (err) {
    console.error(
      "Token exchange error encountered:",
      err.response?.data || err.message,
    );

    return res.status(500).send("Failed to exchange given code for token.");
  }
};

// me handler
const meHandler = (req, res) => {
  // grab auth header
  const authHeader = req.headers.authorization;

  // begin try + catch block for verifying token
  try {
    const verified = verifyToken(authHeader);
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
};

// refresh token handler
const refreshHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const verified = verifyToken(authHeader);

    const data = await getRefreshToken(verified.refreshToken);

    const newJwt = createToken({
      ...verified,
      accessToken: data.access_token,
      refreshToken: data.refresh_token || verified.refreshToken,
    });

    res.json({ token: newJwt });
  } catch (err) {
    res.status(403).json({
      error: "Failed to refresh token",
      details: err.message,
    });
  }
};

// export routes
module.exports = {
  loginHandler,
  callbackHandler,
  meHandler,
  refreshHandler,
};
