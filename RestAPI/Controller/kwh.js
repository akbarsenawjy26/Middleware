const { Op } = require("sequelize");
const kwh = require("../Model/SQL/kwh");

const dataKwhStream = async (req, res) => {
  const { slaveId } = req.params;
  const { priceperKwh } = req.query;

  console.log(slaveId);
  try {
    const data = await kwh.findAll({
      where: {
        slaveID: Number(slaveId),
      },
      limit: 2,
      order: [["createdAt", "DESC"]],
    });
    const tmp = data[0].kWh - data[1].kWh;
    const totalPriceKwh = tmp * priceperKwh;

    return res.json({ kWh: tmp, totalPrice: totalPriceKwh });
  } catch (error) {
    console.log("Result kWh:", error);
    return res.status(400).json(error.slaves);
  }
};

const dataKwhPeriodic = async (req, res) => {
  const { slaveId } = req.params;
  const { startDate, endDate } = req.query;
  const { priceperKwh } = req.query;

  console.log(slaveId);
  try {
    const data = await kwh.findAll({
      where: {
        slaveID: Number(slaveId),
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    console.log("data kwh:", data);
    const result = [];

    for (let index = 0; index < data.length; index++) {
      if (index + 1 != data.length) {
        const tmp = data[index].kWh - data[index + 1].kWh;
        const totalPriceKwh = tmp * priceperKwh;
        const dataTotalPriceKwh = {
          kWh: tmp,
          totalPrice: totalPriceKwh,
        };
        result.push(dataTotalPriceKwh);
      }
    }

    return res.json(result);
  } catch (error) {
    console.log("Result kWh:", error);
    return res.status(400).json(error.slaves);
  }
};
module.exports = {
  dataKwhStream,
  dataKwhPeriodic,
};
