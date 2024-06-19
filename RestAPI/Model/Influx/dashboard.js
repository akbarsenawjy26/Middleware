const { InfluxDB } = require("@influxdata/influxdb-client");
const token =
  "Bn-_W3cTZF-kKSgw4Z0kw0Td9C6yD0NIicv5McTtIE4_ZCn6KJIiqPzCPNKbsUHnJmWvPM2jEp1ckZg4Qw6z2w==";
const url = "http://localhost:8086";
const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi("WIT.SBY");

async function fetchDataDashboard(slaveId) {
  let fluxQuery = `from(bucket: "NewBusDuct")
  |> range(start: -2d)
  |> filter(fn: (r) => r._measurement == "modbus_data")
  |> filter(fn: (r) => r.phase == "dataBasic")
  |> filter(fn: (r) => r.slaveId == "${slaveId}")
  |> limit(n:1)`;

  try {
    const result = await queryApi.collectRows(fluxQuery);
    console.log("result:", result);
    return result;
  } catch (err) {
    console.error(`Error querying InfluxDB for slave ID ${slaveId}:`, err);
    throw new Error(
      `Failed to fetch data from InfluxDB for slave ID ${slaveId}`
    );
  }
}

module.exports = fetchDataDashboard;
