// pull in needed imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

// allow frontend requests
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-vercel-app.vercel.app", // replace later
    ],
    credentials: true,
  }),
);

// pull in authorization routes
const authRoutes = require("./api/auth");
// pull in search routes
const searchRoutes = require("./api/search");
// pull in playlist routes
const playlistRoutes = require("./api/playlist");

// pull in db
const db = require("./db");
const sequelize = db.sequelize;

// pull in global error handler
const { errorHandler } = require("./api/auth/middleware");

// pull in .env variables
const PORT = process.env.PORT || 3001;

// iife holding server startup logic
(async () => {
  try {
    try {
      await sequelize.authenticate();
      console.log("Successfully connected to database!");

      await sequelize.sync({ alter: true });
      console.log("Tables synced successfully with models.");
    } catch (dbErr) {
      console.warn(
        "Database connection failed, continuing anyway:",
        dbErr.message,
      );
    }

    // registers routes
    app.use("/api/auth", authRoutes);
    app.use("/api/search", searchRoutes);
    app.use("/api/playlist", playlistRoutes);

    // verify server is live
    app.get("/", (req, res) => {
      res.send(`Server is up and running on port ${PORT}`);
    });

    // 404 fallback
    app.use((req, res, next) => {
      res.status(404).json({
        error: "Not found",
      });
    });

    // global error handler
    app.use(errorHandler);

    //  bind to 0.0.0.0 for Railway
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
})();
