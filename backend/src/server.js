// server debug
console.log("server loaded!");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://playlister-kappa.vercel.app"],
    credentials: true,
  }),
);

// test route
app.get("/test", (req, res) => {
  console.log("TEST ROUTE HITS");
  res.send("Test route works");
});

// routes
const authRoutes = require("./api/auth");
const searchRoutes = require("./api/search");
const playlistRoutes = require("./api/playlist");

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/playlist", playlistRoutes);

// root
app.get("/", (req, res) => {
  res.send("Server is running");
});

// error handling
const { errorHandler } = require("./api/auth/middleware");

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

// starts server immediately
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});

// connect DB AFTER server starts
const db = require("./db");
const sequelize = db.sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("DB synced");
  } catch (err) {
    console.warn("DB failed (non-blocking):", err.message);
  }
})();
