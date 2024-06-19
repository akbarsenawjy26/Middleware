const ModbusModel = require("../Model/Modbus/energyMeter");
const InfluxModel = require("../Model/Influx/energyMeter");
const DeviceManager = require("../Model/SQL/deviceManager");
const { Point } = require("@influxdata/influxdb-client");
const { convertRegistersToFloat } = require("../Helper/helper");

const fetchData = async (slave) => {
  const modbusModel = new ModbusModel(slave.IP);
  try {
    const dataBasic = await modbusModel.readRegisters(0, 60, slave.slaveID);
    let successFetchDataBasic = true;
    const dataCommon = await modbusModel.readRegisters(60, 18, slave.slaveID);
    let successFetchDataCommon = true;
    const dataMaxCommon = await modbusModel.readRegisters(330, 18, slave.slaveID);
    let successFetchDataMaxCommon = true;
    const dataMinCommon = await modbusModel.readRegisters(408, 18, slave.slaveID);
    let successFetchDataMinCommon = true;
    let isHeartBeatAlive = true;

    if (!dataBasic || dataBasic.length == 0) {
      successFetchDataBasic = false;
    }
    if (!dataCommon || dataCommon.length == 0) {
      successFetchDataCommon = false;
    }
    if (!dataMaxCommon || dataMaxCommon.length == 0) {
      successFetchDataMaxCommon = false;
    }
    if (!dataMinCommon || dataMinCommon.length == 0) {
      successFetchDataMinCommon = false;
    }
    if (!successFetchDataBasic || !successFetchDataCommon || !successFetchDataMaxCommon || !successFetchDataMinCommon) {
      isHeartBeatAlive = false;
    }

    const points = [];
    if (successFetchDataBasic) {
      const dataBasicsPoint = new Point("modbus_data")
        .tag("phase", "dataBasic")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("voltageLN1", convertRegistersToFloat(dataBasic[0], dataBasic[1]))
        .floatField("voltageLL1", convertRegistersToFloat(dataBasic[2], dataBasic[3]))
        .floatField("current1", convertRegistersToFloat(dataBasic[4], dataBasic[5]))
        .floatField("cosPhi1", convertRegistersToFloat(dataBasic[6], dataBasic[7]))
        .floatField("pf1", convertRegistersToFloat(dataBasic[8], dataBasic[9]))
        .floatField("activePower1", convertRegistersToFloat(dataBasic[10], dataBasic[11]))
        .floatField("reactivePower1", convertRegistersToFloat(dataBasic[12], dataBasic[13]))
        .floatField("apparentPower1", convertRegistersToFloat(dataBasic[14], dataBasic[15]))
        .floatField("thdv1", convertRegistersToFloat(dataBasic[16], dataBasic[17]))
        .floatField("thdi1", convertRegistersToFloat(dataBasic[18], dataBasic[19]))
        .floatField("voltageLN2", convertRegistersToFloat(dataBasic[20], dataBasic[21]))
        .floatField("voltageLL2", convertRegistersToFloat(dataBasic[22], dataBasic[23]))
        .floatField("current2", convertRegistersToFloat(dataBasic[24], dataBasic[25]))
        .floatField("cosPhi2", convertRegistersToFloat(dataBasic[26], dataBasic[27]))
        .floatField("pf2", convertRegistersToFloat(dataBasic[28], dataBasic[29]))
        .floatField("activePower2", convertRegistersToFloat(dataBasic[30], dataBasic[31]))
        .floatField("reactivePower2", convertRegistersToFloat(dataBasic[32], dataBasic[33]))
        .floatField("apparentPower2", convertRegistersToFloat(dataBasic[34], dataBasic[35]))
        .floatField("thdv2", convertRegistersToFloat(dataBasic[36], dataBasic[37]))
        .floatField("thdi2", convertRegistersToFloat(dataBasic[38], dataBasic[39]))
        .floatField("voltageLN3", convertRegistersToFloat(dataBasic[40], dataBasic[41]))
        .floatField("voltageLL3", convertRegistersToFloat(dataBasic[42], dataBasic[43]))
        .floatField("current3", convertRegistersToFloat(dataBasic[44], dataBasic[45]))
        .floatField("cosPhi3", convertRegistersToFloat(dataBasic[46], dataBasic[47]))
        .floatField("pf3", convertRegistersToFloat(dataBasic[48], dataBasic[49]))
        .floatField("activePower3", convertRegistersToFloat(dataBasic[50], dataBasic[51]))
        .floatField("reactivePower3", convertRegistersToFloat(dataBasic[52], dataBasic[53]))
        .floatField("apparentPower3", convertRegistersToFloat(dataBasic[54], dataBasic[55]))
        .floatField("thdv3", convertRegistersToFloat(dataBasic[56], dataBasic[57]))
        .floatField("thdi3", convertRegistersToFloat(dataBasic[58], dataBasic[59]))
        .timestamp(new Date());
      points.push(dataBasicsPoint);
    }

    if (successFetchDataCommon) {
      const datacommonPoint = new Point("modbus_data")
        .tag("phase", "dataCommon")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("totalAvg.Volt(L-N)", convertRegistersToFloat(dataCommon[0], dataCommon[1]))
        .floatField("totalAvg.Volt(L-L)", convertRegistersToFloat(dataCommon[2], dataCommon[3]))
        .floatField("totalCurrent", convertRegistersToFloat(dataCommon[4], dataCommon[5]))
        .floatField("totalPF", convertRegistersToFloat(dataCommon[6], dataCommon[7]))
        .floatField("totalActivePower", convertRegistersToFloat(dataCommon[8], dataCommon[9]))
        .floatField("totalReactivePower", convertRegistersToFloat(dataCommon[10], dataCommon[11]))
        .floatField("totalApparentPower", convertRegistersToFloat(dataCommon[12], dataCommon[13]))
        .floatField("totalFreq", convertRegistersToFloat(dataCommon[14], dataCommon[15]))
        .floatField("NeutralCurrent", convertRegistersToFloat(dataCommon[16], dataCommon[17]))
        .timestamp(new Date());
      points.push(datacommonPoint);
    }

    if (successFetchDataMaxCommon) {
      const dataMaxCommonPoint = new Point("modbus_data")
        .tag("phase", "dataMaxCommon")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("Max.totalAvg.Volt(L-N)", convertRegistersToFloat(dataMaxCommon[0], dataMaxCommon[1]))
        .floatField("Max.totalAvg.Volt(L-L)", convertRegistersToFloat(dataMaxCommon[2], dataMaxCommon[3]))
        .floatField("Max.totalCurrent", convertRegistersToFloat(dataMaxCommon[4], dataMaxCommon[5]))
        .floatField("Max.totalPF", convertRegistersToFloat(dataMaxCommon[6], dataMaxCommon[7]))
        .floatField("Max.totalActivePower", convertRegistersToFloat(dataMaxCommon[8], dataMaxCommon[9]))
        .floatField("Max.totalReactivePower", convertRegistersToFloat(dataMaxCommon[10], dataMaxCommon[11]))
        .floatField("Max.totalApparentPower", convertRegistersToFloat(dataMaxCommon[12], dataMaxCommon[13]))
        .floatField("Max.totalFreq", convertRegistersToFloat(dataMaxCommon[14], dataMaxCommon[15]))
        .floatField("Max.NeutralCurrent", convertRegistersToFloat(dataMaxCommon[16], dataMaxCommon[17]))
        .timestamp(new Date());
      points.push(dataMaxCommonPoint);
    }

    if (successFetchDataMinCommon) {
      const dataMinCommonPoint = new Point("modbus_data")
        .tag("phase", "dataMaxCommon")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("Min.totalAvg.Volt(L-N)", convertRegistersToFloat(dataMinCommon[0], dataMinCommon[1]))
        .floatField("Min.totalAvg.Volt(L-L)", convertRegistersToFloat(dataMinCommon[2], dataMinCommon[3]))
        .floatField("Min.totalCurrent", convertRegistersToFloat(dataMinCommon[4], dataMinCommon[5]))
        .floatField("Min.totalPF", convertRegistersToFloat(dataMinCommon[6], dataMinCommon[7]))
        .floatField("Min.totalActivePower", convertRegistersToFloat(dataMinCommon[8], dataMinCommon[9]))
        .floatField("Min.totalReactivePower", convertRegistersToFloat(dataMinCommon[10], dataMinCommon[11]))
        .floatField("Min.totalApparentPower", convertRegistersToFloat(dataMinCommon[12], dataMinCommon[13]))
        .floatField("Min.totalFreq", convertRegistersToFloat(dataMinCommon[14], dataMinCommon[15]))
        .floatField("Min.NeutralCurrent", convertRegistersToFloat(dataMinCommon[16], dataMinCommon[17]))
        .timestamp(new Date());
      points.push(dataMinCommonPoint);
    }

    const result = InfluxModel.createModbusData(points);
    console.log("result influx:", result);
    await DeviceManager.update(
      {
        heartBeat: isHeartBeatAlive,
      },
      {
        where: { id: slave.id },
      }
    );
    return;
  } catch (error) {
    console.error(`Error reading Modbus data from slave ID ${slave.slaveID}:`, error);
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
  // console.log("mulithread:", dataMultiThread);
  try {
    for (let slave of dataMultiThread) {
      let tmp = [];
      const multiThread = slave.map((data) => fetchData(data));
      await Promise.all(multiThread);
      await sleep(1000);
    }
  } catch (error) {
    console.log("error execute:", error);
  } finally {
    setImmediate(() => {
      execute();
    });
  }
};

module.exports = {
  execute,
};
