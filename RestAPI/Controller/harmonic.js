const DataHarmonic = require("../Model/Influx/harmonic");

const harmonicData = async (req, res) => {
  const { slaveId } = req.params;
  try {
    const data = await DataHarmonic.fetchDataharmonic(slaveId);
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
    console.log("Result Data Harmonic:", error);
    return res.status(400).json(error.slaves);
  }
};

const harmonicDataRange = async (req, res) => {
  const { slaveId } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    res.status(404).json({ error: `No range input fo slave ID ${slaveId}` });
  }

  try {
    const data = await DataHarmonic.fetchDataharmonicRange(
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

module.exports = {
  harmonicData,
  harmonicDataRange,
};
