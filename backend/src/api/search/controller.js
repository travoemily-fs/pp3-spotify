/* 
primary search routes are housed here
*/

// pull in needed imports
const axios = require("axios");
// pull in user model
const { User } = require("../../db");
// pull in token verification handler
const { verifyToken } = require("../auth/utils");

// begin search handlers

// searchHandler
const searchHandler = async (req, res) => {
  // grab query string & authorization header
  const authHeader = req.headers.authorization;
  const searchQuery = req.query.q;
  const searchType = req.query.type;

  // define allowed search types
  const allowedTypes = [
    "album",
    "artist",
    "playlist",
    "track",
    "show",
    "episode",
    "audiobook",
  ];

  // set types a user will search for
  const singleType = req.query.type || "artist,album,track";

  // split type array into a string to filter through accepted types
  const searchTypeArray = singleType
    .split(",")
    .map((type) => type.trim().toLowerCase())
    .filter((type) => allowedTypes.includes(type));

  // verify token and get user ID
  const verified = verifyToken(authHeader);
  const user = await User.findByPk(verified.id);

  // failsafe for null user
  if (!user) {
    return res.status(404).json({
      error: "Failed to locate user.",
      // provides extra debugging info on what went wrong
      details: err.message,
    });
  }
  // set query params
  const queryParams = {
    q: searchQuery,
    type: searchTypeArray.join(","),
  };
  // send search to spotify w/ user's token
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
    params: queryParams,
  });
  // respond w/ data
  res.json({
    artists: response.data.artists?.items || [],
    albums: response.data.albums?.items || [],
    tracks: response.data.tracks?.items || [],
  });
};

// export handler
module.exports = { searchHandler };
