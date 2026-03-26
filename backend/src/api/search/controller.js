// pull in needed imports
const axios = require("axios");

// search handler
const searchHandler = async (req, res) => {
  console.log("search route hit");

  try {
    const authHeader = req.headers.authorization;
    const searchQuery = req.query.q;

    // guard clauses
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    if (!searchQuery) {
      return res.status(400).json({ error: "Missing search query" });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // allowed search types
    const allowedTypes = [
      "album",
      "artist",
      "playlist",
      "track",
      "show",
      "episode",
      "audiobook",
    ];

    const singleType = req.query.type || "track";

    const searchTypeArray = singleType
      .split(",")
      .map((type) => type.trim().toLowerCase())
      .filter((type) => allowedTypes.includes(type));

    // call Spotify directly
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchQuery,
        type: searchTypeArray.join(","),
        limit: 20,
      },
    });

    console.log("spotify search success");

    return res.json({
      artists: response.data.artists?.items || [],
      albums: response.data.albums?.items || [],
      tracks: response.data.tracks?.items || [],
    });
  } catch (err) {
    console.error("search error:", err.response?.data || err.message);

    return res.status(500).json({
      error: "Search failed",
      details: err.response?.data || err.message,
    });
  }
};

module.exports = { searchHandler };
