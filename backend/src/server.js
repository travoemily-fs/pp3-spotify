require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./api/auth");
const db = require("./db");
const sequelize = db.sequelize;

const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to database!");

    await sequelize.sync({ alter: true });
    console.log("Tables synced successfully with models.");

    app.use("/api/auth", authRoutes);

    app.get("/", (req, res) => {
      res.send(`Congrats! The server is up and running on port ${PORT}.`);
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  }
})();
