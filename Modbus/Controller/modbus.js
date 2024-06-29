const ModbusModel = require("../Model/Modbus/energyMeter");
const InfluxModel = require("../Model/Influx/energyMeter");
const DeviceManager = require("../Model/SQL/deviceManager");
const { Point } = require("@influxdata/influxdb-client");
const { convertRegistersToFloat } = require("../Helper/helper");
const dataModel = require("../Interface/modbusController");
let cachedData = {};

const fetchData = async (slave) => {
  const modbusModel = new ModbusModel(slave.IP);
  const apiStreaming = dataModel.apiStreaming();

  try {
    const dataBasic = await modbusModel.readRegisters(0, 60, slave.slaveID);
    let successFetchDataBasic = true;
    const dataCommon = await modbusModel.readRegisters(60, 18, slave.slaveID);
    let successFetchDataCommon = true;
    let isHeartBeatAlive = true;

    if (!dataBasic || dataBasic.length == 0) {
      successFetchDataBasic = false;
    }
    if (!dataCommon || dataCommon.length == 0) {
      successFetchDataCommon = false;
    }
    if (!modbusModel.connect()) {
      isHeartBeatAlive = false;
    }

    const points = [];
    if (successFetchDataBasic) {
      const modelDataBasic = dataModel.dataBasic();
      modelDataBasic.voltageLN1 = convertRegistersToFloat(dataBasic[0], dataBasic[1]);
      modelDataBasic.voltageLL1 = convertRegistersToFloat(dataBasic[2], dataBasic[3]);
      modelDataBasic.current1 = convertRegistersToFloat(dataBasic[4], dataBasic[5]);
      modelDataBasic.cosPhi1 = convertRegistersToFloat(dataBasic[6], dataBasic[7]);
      modelDataBasic.pf1 = convertRegistersToFloat(dataBasic[8], dataBasic[9]);
      modelDataBasic.activePower1 = convertRegistersToFloat(dataBasic[10], dataBasic[11]);
      modelDataBasic.reactivePower1 = convertRegistersToFloat(dataBasic[12], dataBasic[13]);
      modelDataBasic.apparentPower1 = convertRegistersToFloat(dataBasic[14], dataBasic[15]);
      modelDataBasic.thdv1 = convertRegistersToFloat(dataBasic[16], dataBasic[17]);
      modelDataBasic.thdi1 = convertRegistersToFloat(dataBasic[18], dataBasic[19]);
      modelDataBasic.voltageLN2 = convertRegistersToFloat(dataBasic[20], dataBasic[21]);
      modelDataBasic.voltageLL2 = convertRegistersToFloat(dataBasic[22], dataBasic[23]);
      modelDataBasic.current2 = convertRegistersToFloat(dataBasic[24], dataBasic[25]);
      modelDataBasic.cosPhi2 = convertRegistersToFloat(dataBasic[26], dataBasic[27]);
      modelDataBasic.pf2 = convertRegistersToFloat(dataBasic[28], dataBasic[29]);
      modelDataBasic.activePower2 = convertRegistersToFloat(dataBasic[30], dataBasic[31]);
      modelDataBasic.reactivePower2 = convertRegistersToFloat(dataBasic[32], dataBasic[33]);
      modelDataBasic.apparentPower2 = convertRegistersToFloat(dataBasic[34], dataBasic[35]);
      modelDataBasic.thdv2 = convertRegistersToFloat(dataBasic[36], dataBasic[37]);
      modelDataBasic.thdi2 = convertRegistersToFloat(dataBasic[38], dataBasic[39]);
      modelDataBasic.voltageLN3 = convertRegistersToFloat(dataBasic[40], dataBasic[41]);
      modelDataBasic.voltageLL3 = convertRegistersToFloat(dataBasic[42], dataBasic[43]);
      modelDataBasic.current3 = convertRegistersToFloat(dataBasic[44], dataBasic[45]);
      modelDataBasic.cosPhi3 = convertRegistersToFloat(dataBasic[46], dataBasic[47]);
      modelDataBasic.pf3 = convertRegistersToFloat(dataBasic[48], dataBasic[49]);
      modelDataBasic.activePower3 = convertRegistersToFloat(dataBasic[50], dataBasic[51]);
      modelDataBasic.reactivePower3 = convertRegistersToFloat(dataBasic[52], dataBasic[53]);
      modelDataBasic.apparentPower3 = convertRegistersToFloat(dataBasic[54], dataBasic[55]);
      modelDataBasic.thdv3 = convertRegistersToFloat(dataBasic[56], dataBasic[57]);
      modelDataBasic.thdi3 = convertRegistersToFloat(dataBasic[58], dataBasic[59]);

      const dataBasicsPoint = new Point("modbus_data")
        .tag("phase", "dataBasic")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("voltageLN1", modelDataBasic.voltageLN1)
        .floatField("voltageLL1", modelDataBasic.voltageLL1)
        .floatField("current1", modelDataBasic.current1)
        .floatField("cosPhi1", modelDataBasic.cosPhi1)
        .floatField("pf1", modelDataBasic.pf1)
        .floatField("activePower1", modelDataBasic.activePower1)
        .floatField("reactivePower1", modelDataBasic.reactivePower1)
        .floatField("apparentPower1", modelDataBasic.apparentPower1)
        .floatField("thdv1", modelDataBasic.thdv1)
        .floatField("thdi1", modelDataBasic.thdi1)
        .floatField("voltageLN2", modelDataBasic.voltageLN2)
        .floatField("voltageLL2", modelDataBasic.voltageLL2)
        .floatField("current2", modelDataBasic.current2)
        .floatField("cosPhi2", modelDataBasic.cosPhi2)
        .floatField("pf2", modelDataBasic.pf2)
        .floatField("activePower2", modelDataBasic.activePower2)
        .floatField("reactivePower2", modelDataBasic.reactivePower2)
        .floatField("apparentPower2", modelDataBasic.apparentPower2)
        .floatField("thdv2", modelDataBasic.thdv2)
        .floatField("thdi2", modelDataBasic.thdi2)
        .floatField("voltageLN3", modelDataBasic.voltageLN3)
        .floatField("voltageLL3", modelDataBasic.voltageLL3)
        .floatField("current3", modelDataBasic.current3)
        .floatField("cosPhi3", modelDataBasic.cosPhi3)
        .floatField("pf3", modelDataBasic.pf3)
        .floatField("activePower3", modelDataBasic.activePower3)
        .floatField("reactivePower3", modelDataBasic.reactivePower3)
        .floatField("apparentPower3", modelDataBasic.apparentPower3)
        .floatField("thdv3", modelDataBasic.thdv3)
        .floatField("thdi3", modelDataBasic.thdi3)
        .timestamp(new Date());
      points.push(dataBasicsPoint);
      apiStreaming.DataBasic = modelDataBasic;
    }

    if (successFetchDataCommon) {
      const modelDataCommon = dataModel.dataCommon();
      modelDataCommon.totalAvgVoltLN = convertRegistersToFloat(dataCommon[0], dataCommon[1]);
      modelDataCommon.totalAvgVoltLL = convertRegistersToFloat(dataCommon[2], dataCommon[3]);
      modelDataCommon.totalCurrent = convertRegistersToFloat(dataCommon[4], dataCommon[5]);
      modelDataCommon.totalPF = convertRegistersToFloat(dataCommon[6], dataCommon[7]);
      modelDataCommon.totalActivePower = convertRegistersToFloat(dataCommon[8], dataCommon[9]);
      modelDataCommon.totalReactivePower = convertRegistersToFloat(dataCommon[10], dataCommon[11]);
      modelDataCommon.totalApparentPower = convertRegistersToFloat(dataCommon[12], dataCommon[13]);
      modelDataCommon.totalFreq = convertRegistersToFloat(dataCommon[14], dataCommon[15]);
      modelDataCommon.NeutralCurrent = convertRegistersToFloat(dataCommon[16], dataCommon[17]);

      const datacommonPoint = new Point("modbus_data")
        .tag("phase", "dataCommon")
        .tag("slaveFloor", slave.floor.toString())
        .tag("slaveId", slave.slaveID.toString())
        .tag("slaveIp", slave.IP.toString())
        .floatField("totalAvg. Volt(L-N)", modelDataCommon.totalAvgVoltLN)
        .floatField("totalAvg.Volt(L-L)", modelDataCommon.totalAvgVoltLL)
        .floatField("totalCurrent", modelDataCommon.totalCurrent)
        .floatField("totalPF", modelDataCommon.totalPF)
        .floatField("totalActivePower", modelDataCommon.totalActivePower)
        .floatField("totalReactivePower", modelDataCommon.totalReactivePower)
        .floatField("totalApparentPower", modelDataCommon.totalApparentPower)
        .floatField("totalFreq", modelDataCommon.totalFreq)
        .floatField("NeutralCurrent", modelDataCommon.NeutralCurrent)
        .timestamp(new Date());
      points.push(datacommonPoint);
      apiStreaming.DataCommon = modelDataCommon;
    }

    InfluxModel.createModbusData(points);

    cachedData[slave.slaveID] = apiStreaming;

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

const restApiController = async (req, res) => {
  const slaveId = parseInt(req.params.slaveId);
  const dataApiStream = cachedData[slaveId];

  if (!dataApiStream) {
    return res.status(404).json({ error: `No data found for slave ID ${slaveId}` });
  }

  res.json(dataApiStream);
  console.log(slaveId, dataApiStream);
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

  console.log(result);
  return result.filter((group) => group.length > 0);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const execute = async () => {
  try {
    const dataMultiThread = await prepareMultiThread();
    for (let slave of dataMultiThread) {
      console.log(`Processing slave: ${JSON.stringify(slave)}`);
      const multiThread = slave.map((data) => fetchData(data));
      const results = await Promise.all(multiThread);
      console.log(`Results: ${results}`);
      await sleep(5000);
    }
  } catch (error) {
    console.log("Error execute:", error);
  } finally {
    console.log("Re-executing...");
    setImmediate(() => {
      execute();
    });
  }
};

module.exports = {
  execute,
  restApiController,
};
