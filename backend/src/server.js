// pull in needed imports
require("dotenv").config();
const express = require("express");
const app = express();
// pull in authorization routes
const authRoutes = require("./api/auth");
// pull in search routes
const searchRoutes = require("./api/search");
const db = require("./db");
const sequelize = db.sequelize;

// pull in .env variables
const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET;

// iife holding server startup logic
(async () => {
  // connect and sync db data
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to database!");
    await sequelize.sync({ alter: true });
    console.log("Tables synced successfully with models.");
  // use auth routes
    app.use("/api/auth", authRoutes);
      // use search routes
    app.use("/api/search", searchRoutes);
  // verify server is live
    app.get("/", (req, res) => {
      res.send(`Congrats! The server is up and running on port ${PORT}.`);
    });
  // verify app is running on correct port
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    // catch errors, end app if needed 
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  }
})();
