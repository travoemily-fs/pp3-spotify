/* 
helper functions live here
createJWT
verifyJWT
extractJWT

note for self: utility functions are reusable and are not tied to express; they are responsible for signing tokens, verifying tokens, or formatting 
*/

// pull in needed imports
const jwt = require("jsonwebtoken");

// begin token handlers

// createToken
const createToken = (user) => {
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
};

// verifyToken
const verifyToken = (authHeader) => {
  // if no authHeader sent, deny user access
  if (!authHeader) {
    throw new Error("No authorization header was sent.");
  }
  // check for expected token format (ie does it start with "bearer"?)
  if (!authHeader.startsWith("Bearer")) {
    throw new Error("Unrecognized header format.");
  }
  // split "bearer" from token to extract just the token
  const token = authHeader.split(" ")[1];
  // second catch for absent tokens
  if (!token) {
    throw new Error("Token not found.");
  }
  // return the verified token w/ jwt secret
  return jwt.verify(token, process.env.JWT_SECRET);
};

// refreshToken
const getRefreshToken = async (refreshToken) => {
  // define auth header by extracting client id + client secret
const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  // define response params
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHeader}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }),
  });
  // send response params to spotify 
  const data = await response.json();
  return data;
}

module.exports = {
  createToken,
  verifyToken,
  getRefreshToken
};
