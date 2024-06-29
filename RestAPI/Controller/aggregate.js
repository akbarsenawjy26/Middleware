const HourlyData = require("../Model/SQL/hourlyData");
const DailyData = require("../Model/SQL/dailyData");
const MonthlyData = require("../Model/SQL/monthlyData");
const aggregateModel = require("../Model/Influx/aggregate");

const aggregateHourlyData = async (req, res) => {
  const { range, aggregate } = req.query;

  if (!aggregate || !range) {
    return res.status(404).json({ error: `No data found` });
  }

  try {
    const data = await aggregateModel.fetchDataAggregate(range, aggregate);
    if (data.length === 0) {
      return res.status(404).json({ error: `No data found` });
    }

    const groupedData = data.reduce((acc, curr) => {
      const time = curr._time;
      if (!acc[time]) {
        acc[time] = {
          _time: time,
          slaveFloor: curr.slaveFloor,
          slaveId: curr.slaveId,
          slaveIp: curr.slaveIp,
        };
      }
      acc[time][curr._field] = curr._value;
      return acc;
    }, {});

    const finalResult = Object.values(groupedData);
    for (const record of finalResult) {
      await HourlyData.create(record);
    }

    if (res && typeof res.json === "function") {
      return res.json(finalResult);
    } else {
      console.log("Aggregate Data:", finalResult);
      return finalResult;
    }
  } catch (error) {
    console.log("Result Aggregate:", error);
    return res.status(400).json(error.slaves);
  }
};

const aggregateDailyData = async (req, res) => {
  const { range, aggregate } = req.query;

  if (!aggregate || !range) {
    return res.status(404).json({ error: `No data found` });
  }

  try {
    const data = await aggregateModel.fetchDataAggregate(range, aggregate);
    if (data.length === 0) {
      return res.status(404).json({ error: `No data found` });
    }

    const groupedData = data.reduce((acc, curr) => {
      const time = curr._time;
      if (!acc[time]) {
        acc[time] = {
          _time: time,
          slaveFloor: curr.slaveFloor,
          slaveId: curr.slaveId,
          slaveIp: curr.slaveIp,
        };
      }
      acc[time][curr._field] = curr._value;
      return acc;
    }, {});

    const finalResult = Object.values(groupedData);
    for (const record of finalResult) {
      await DailyData.create(record);
    }

    if (res && typeof res.json === "function") {
      return res.json(finalResult);
    } else {
      console.log("Aggregate Data:", finalResult);
      return finalResult;
    }
  } catch (error) {
    console.log("Result Aggregate:", error);
    return res.status(400).json(error.slaves);
  }
};

const aggregateMonthlyData = async (req, res) => {
  const { range, aggregate } = req.query;

  if (!aggregate || !range) {
    return res.status(404).json({ error: `No data found` });
  }

  try {
    const data = await aggregateModel.fetchDataAggregate(range, aggregate);
    if (data.length === 0) {
      return res.status(404).json({ error: `No data found` });
    }

    const groupedData = data.reduce((acc, curr) => {
      const time = curr._time;
      if (!acc[time]) {
        acc[time] = {
          _time: time,
          slaveFloor: curr.slaveFloor,
          slaveId: curr.slaveId,
          slaveIp: curr.slaveIp,
        };
      }
      acc[time][curr._field] = curr._value;
      return acc;
    }, {});

    const finalResult = Object.values(groupedData);
    for (const record of finalResult) {
      await MonthlyData.create(record);
    }

    if (res && typeof res.json === "function") {
      return res.json(finalResult);
    } else {
      console.log("Aggregate Data:", finalResult);
      return finalResult;
    }
  } catch (error) {
    console.log("Result Aggregate:", error);
    return res.status(400).json(error.slaves);
  }
};

const executeHourly = async () => {
  try {
    const req = {
      query: {
        range: "-7d",
        aggregate: "1h",
      },
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          console.log(`Status: ${code}`, data);
        },
      }),
    };

    await aggregateHourlyData(req, res);
  } catch (error) {
    console.error("Error running aggregateHourlyData:", error);
  }
};

const executeDaily = async () => {
  try {
    const req = {
      query: {
        range: "-7d",
        aggregate: "1d",
      },
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          console.log(`Status: ${code}`, data);
        },
      }),
    };

    await aggregateDailyData(req, res);
  } catch (error) {
    console.error("Error running aggregateHourlyData:", error);
  }
};

const executeMonthly = async () => {
  console.log("Execute Monthly");
  try {
    const req = {
      query: {
        range: "-7d",
        aggregate: "1d",
      },
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          console.log(`Status: ${code}`, data);
        },
      }),
    };

    await aggregateMonthlyData(req, res);
  } catch (error) {
    console.error("Error running aggregateHourlyData:", error);
  }
};

module.exports = {
  aggregateHourlyData,
  executeHourly,
  executeDaily,
  executeMonthly,
};
