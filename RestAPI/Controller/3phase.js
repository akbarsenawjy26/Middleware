const Data3phase = require("../Model/Influx/3phase");
const HourlyData = require("../Model/SQL/hourlyData");
const { Op, fn, col } = require("sequelize");

const phaseData = async (req, res) => {
  const { slaveId } = req.params;
  try {
    const data = await Data3phase.fetchData3phase(slaveId);
    // console.log("data 3 phase:", data);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    const combinedResult = data.reduce((acc, curr) => {
      acc[curr._field] = curr._value;
      return acc;
    }, {});
    return res.json(combinedResult);
  } catch (error) {
    console.log("Result Device Healt:", error);
    return res.status(400).json(error.slaves);
  }
};

const phaseDataRange = async (req, res) => {
  const { slaveId } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    res.status(404).json({ error: `No range input fo slave ID ${slaveId}` });
  }

  try {
    const data = await Data3phase.fetchData3phaseRange(
      slaveId,
      startDate,
      endDate
    );
    // console.log("data 3 phase range:", data);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    // Menggabungkan data berdasarkan _time
    const stats = {};

    // Iterate over the data to compute min, max, and sums
    data.forEach((entry) => {
      const field = entry._field;
      const value = entry._value;

      if (!stats[field]) {
        stats[field] = {
          min: value,
          max: value,
          sum: value,
          count: 1,
        };
      } else {
        stats[field].min = Math.min(stats[field].min, value);
        stats[field].max = Math.max(stats[field].max, value);
        stats[field].sum += value;
        stats[field].count += 1;
      }
    });

    // Compute averages
    Object.keys(stats).forEach((field) => {
      stats[field].avg = stats[field].sum / stats[field].count;
    });

    // Prepare the response
    const combinedResult = data.map((entry) => {
      return {
        _time: entry._time,
        _start: entry._start,
        _stop: entry._stop,
        _measurement: entry._measurement,
        phase: entry.phase,
        slaveFloor: entry.slaveFloor,
        slaveId: entry.slaveId,
        slaveIp: entry.slaveIp,
        ...Object.keys(stats).reduce((acc, field) => {
          acc[`${field}_min`] = stats[field].min;
          acc[`${field}_max`] = stats[field].max;
          acc[`${field}_avg`] = stats[field].avg;
          return acc;
        }, {}),
      };
    });

    return res.json(combinedResult);
  } catch (error) {
    console.log("Result Device Health:", error);
    return res.status(400).json({ error: error.message });
  }
};

const phaseSQL = async (req, res) => {
  const { slaveId } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate and endDate are required" });
  }

  try {
    const data = await HourlyData.findAll({
      attributes: [
        "slaveID",
        "createdAt",
        "voltageLN1",
        "voltageLN2",
        "voltageLN3",
        "voltageLL1",
        "voltageLL2",
        "voltageLL3",
        "current1",
        "current2",
        "current3",
      ],
      where: {
        slaveID: Number(slaveId),
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    console.log("api:", data);
    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching hourly data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }
};

module.exports = {
  phaseData,
  phaseDataRange,
  phaseSQL,
};
