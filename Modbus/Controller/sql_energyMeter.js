const EnergyMeter = require("../Model/SQL/energyMeter");
const ModbusModel = require("../Model/Modbus/energyMeter");
const DeviceManager = require("../Model/SQL/deviceManager");
const Helper = require("../Helper/helper");

const fetchDataEnergyMeter = async (slave) => {
  try {
    const modbusModel = new ModbusModel(slave.IP);
    const dataEnergy = await modbusModel.readRegisters(470, 2, slave.slaveID);
    const kWh = Helper.convertRegistersToInt32(dataEnergy[0], dataEnergy[1]);
    await EnergyMeter.create({
      kWh: kWh,
      slaveID: slave.slaveID,
    });
    return;
  } catch (error) {
    console.log("error Energy Meter:", error);
    return;
  }
};

const prepareMultiThread = async () => {
  const slaves = await DeviceManager.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    raw: true,
  });
  const groupedByIp = slaves.reduce((acc, obj) => {
    if (!acc[obj.IP]) {
      acc[obj.IP] = [];
    }
    acc[obj.IP].push(obj);
    return acc;
  }, {});

  const groups = Object.values(groupedByIp);
  const result = [];

  groups.forEach((group) => {
    group.forEach((slave, index) => {
      if (!result[index]) {
        result[index] = [];
      }
      result[index].push(slave);
    });
  });

  return result.filter((group) => group.length > 0);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const execute = async () => {
  const dataMultiThread = await prepareMultiThread();
  console.log(dataMultiThread);
  try {
    for (let slave of dataMultiThread) {
      let tmp = [];
      const multiThread = slave.map((data) => fetchDataEnergyMeter(data));
      await Promise.all(multiThread);
      await sleep(1000);
    }
  } catch (error) {
    console.log("error execute:", error);
  }
};

module.exports = {
  execute,
};
