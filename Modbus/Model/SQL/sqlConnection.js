const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db@wit", "akbar@wit.com", "akbarWIT2024", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
