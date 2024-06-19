const { DataTypes } = require("sequelize");
const sequelize = require("./sqlConnection");

const OverviewKWH = sequelize.define(
  "energyMeter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autotoIncrement: true,
    },
    kWh: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    slaveID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.INTEGER,
    },
  },
  {
    tableName: "energyMeter",
    timeStamp: true,
  }
);

module.exports = OverviewKWH;
