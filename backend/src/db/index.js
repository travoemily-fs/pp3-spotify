"use strict";

// import core node + sequelize modules
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);

// initialize sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "mysql_db",
    dialect: "mysql",
    logging: false,
  }
);

// create db object to hold models and sequelize reference
const db = {};

// read and register all model files in this directory
fs.readdirSync(path.join(__dirname, "models"))
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const modelFn = require(path.join(__dirname, "models", file));
    const model = modelFn(sequelize, Sequelize.DataTypes);
    console.log("Loaded model:", model?.name);
    db[model.name] = model;
  });

// attach sequelize references
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export the db object
module.exports = db;
