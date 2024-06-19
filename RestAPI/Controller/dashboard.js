const fetchDataDashboard = require("../Model/Influx/dashboard");

const DashboardData = async (req, res) => {
  const { slaveId } = req.params;
  try {
    const data = await fetchDataDashboard(slaveId);
    console.log("data Dashboard:", data);
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

module.exports = {
  DashboardData,
};
