const { DataTypes } = require("sequelize");
const sequelize = require("./sqlConnection");

const DeviceManager = sequelize.define(
  "deviceManager",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autotoIncrement: true,
    },
    slaveID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IP: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    heartBeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "deviceManager",
    timeStamp: true,
  }
);

module.exports = DeviceManager;
