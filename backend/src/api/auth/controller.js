/* 
primary routes live here:
loginHandler
callbackHandler
meHandler
*/

// pull in needed imports
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { createToken, verifyToken, getRefreshToken } = require("./utils");

// pull in env variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// begin routes

// login handler
const loginHandler = (req, res) => {
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
};

// callback handler
const callbackHandler = async (req, res) => {
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
    const token = createToken(user);
    // sends success redirect response
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  } catch (err) {
    // check for response data from spotify to log, otherwise print generic error
    console.error(
      "Token exchange error encountered:",
      err.response?.data || err.message
    );
    // throw 500 error status
    res.status(500).send("Failed to exchange given code for token.");
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
  // grab auth header
  const authHeader = req.headers.authorization;

  // begin try + catch block for verifying refresh token
  try {
    // pull in verified token and user info
    const verified = verifyToken(authHeader);
    const user = await User.findByPk(verified.id);

    // define refresh token
    const data = await getRefreshToken(user.refreshToken);

    // if refresh token is given, pull original access token and update it
    if (data.refresh_token) {
      await user.update({
        refreshToken: data.refresh_token,
      });
    }

    if (data.access_token) {
      await user.update({
        accessToken: data.access_token,
      });
    }

    // creates and sends new jwt
    const newJwt = createToken(user);
    res.json({
      token: newJwt,
    });
  } catch (err) {
    // handle w/ a 403 forbidden error
    res.status(403).json({
      error: "Failed to get refresh token",
      // provides extra debugging info on what went wrong
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
