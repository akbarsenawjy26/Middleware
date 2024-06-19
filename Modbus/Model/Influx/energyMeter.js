const { InfluxDB } = require("@influxdata/influxdb-client");
const token = "Ysrt9ABZFa1vYm93emiWSUaKQqghKaSzCoJ0qOCs_cmmt2NxGZwipOLuruweFy34asYNn1k2cBbDOjl3StjPgQ==";
const url = "http://localhost:8086";
const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi("WIT.SBY", "NewBusDuct");

const createModbusData = (data) => {
  try {
    console.log("data influx:", data);
    return writeApi.writePoints(data);
  } catch (error) {
    console.log("Error Influx", error);
  }
};

module.exports = {
  createModbusData,
};
