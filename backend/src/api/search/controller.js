const axios = require("axios");

const searchHandler = async (req, res) => {
  console.log("SEARCH USER:", req.user);
  console.log("Search route hit");

  try {
    const authHeader = req.headers.authorization;
    const query = req.query.q;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing auth header" });
    }

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const token = authHeader.split(" ")[1];

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
