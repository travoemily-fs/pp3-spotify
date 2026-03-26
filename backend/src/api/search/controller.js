const axios = require("axios");

const searchHandler = async (req, res) => {
  console.log("SEARCH USER:", req.user);
  console.log("Search route hit");

  try {
    const query = req.query.q;

    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ error: "Missing access token" });
    }

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const token = req.user.accessToken; 

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: {
        q: query,
        type: "track",
        limit: 20,
      },
    });

    return res.json(response.data);
  } catch (err) {
    console.error("SEARCH CRASH:", err.response?.data || err.message);

    return res.status(500).json({
      error: "Search failed",
      details: err.response?.data || err.message,
    });
  }
};

module.exports = { searchHandler };
