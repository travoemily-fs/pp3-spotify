const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  // bring in env variables
  {
    // establish connection by passing params
    host: "localhost",
    dialect: "mysql",
    // turn off logging to avoid seeing the requests
    logging: false,
  }
);

module.exports = sequelize;
