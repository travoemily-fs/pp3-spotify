// pull in needed imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

// allow frontend requests
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// pull in authorization routes
const authRoutes = require("./api/auth");
// pull in search routes
const searchRoutes = require("./api/search");
// pull in playlist routes
const playlistRoutes = require("./api/playlist");

// pull in db
const db = require("./db");
// pull in sequelize
const sequelize = db.sequelize;

// pull in global error handler
const { errorHandler } = require("./api/auth/middleware");

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
    // use playlist routes
    app.use("/api/playlist", playlistRoutes);

    // verify server is live
    app.get("/", (req, res) => {
      res.send(`Congrats! The server is up and running on port ${PORT}.`);
    });

    // use 404 backend fallback
    app.use((req, res, next) => {
      // handle w/ a 404 not found error
      res.status(404).json({
        error: "Not found",
      });
    });

    // use global error handler
    app.use(errorHandler);

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
