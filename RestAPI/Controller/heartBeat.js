const deviceManager = require("../Model/SQL/deviceManager");

const DeviceManager = async (req, res) => {
  try {
    const slaves = await deviceManager.findAll({
      raw: true,
    });
    return res.json(slaves);
  } catch (error) {
    console.log("Result Device Healt:", error);
    return res.status(400).json(error.slaves);
  }
};

module.exports = {
  DeviceManager,
};
