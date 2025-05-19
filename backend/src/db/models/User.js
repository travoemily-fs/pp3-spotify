"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      spotifyId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
