const { DataTypes } = require("sequelize");
const sequelize = require("../SQL/sqlConnection");

const EnergyMeter = sequelize.define(
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
    },
  },
  {
    tableName: "energyMeter",
    timeStamp: true,
  }
);

module.exports = EnergyMeter;
