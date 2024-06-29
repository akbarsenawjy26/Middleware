const { DataTypes } = require("sequelize");
const sequelize = require("./sqlConnection");

const DailyData = sequelize.define(
  "daily_data",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    slaveId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    voltageLN1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    voltageLL1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    current1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cosPhi1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pf1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activePower1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reactivePower1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    apparentPower1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdv1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdi1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    voltageLN2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    voltageLL2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    current2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cosPhi2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pf2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activePower2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reactivePower2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    apparentPower2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdv2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdi2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    voltageLN3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    voltageLL3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    current3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cosPhi3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pf3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activePower3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reactivePower3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    apparentPower3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdv3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thdi3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalAvgVoltLN: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalAvgVoltLL: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalCurrent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalPF: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalActivePower: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalReactivePower: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalApparentPower: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalFreq: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    NeutralCurrent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "daily_data",
    timestamps: true,
  }
);

module.exports = DailyData;
