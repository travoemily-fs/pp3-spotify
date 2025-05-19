"use strict";
const fs = require("fs");
const path = require("path")
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);

// initialize sequelize
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

// initialize an empty db object to store models
const db = {};

// read the model files 
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  // attach both sequelize references 
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;
