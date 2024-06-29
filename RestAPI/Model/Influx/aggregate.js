const { InfluxDB } = require("@influxdata/influxdb-client");
const token =
  "Bn-_W3cTZF-kKSgw4Z0kw0Td9C6yD0NIicv5McTtIE4_ZCn6KJIiqPzCPNKbsUHnJmWvPM2jEp1ckZg4Qw6z2w==";
const url = "http://localhost:8086";
const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi("WIT.SBY");

async function fetchDataAggregate(range, aggregate) {
  let fluxQuery = `from(bucket: "NewBusDuct")
  |> range(start: ${range})
  |> filter(fn: (r) => r["_measurement"] == "modbus_data")
  |> filter(fn: (r) => r["phase"] == "dataBasic" or r["phase"] == "dataCommon")
  |> filter(fn: (r) => r["_field"] == "activePower1" or r["_field"] == "activePower2" or r["_field"] == "activePower3" or r["_field"] == "apparentPower1" or r["_field"] == "apparentPower2" or r["_field"] == "apparentPower3" or r["_field"] == "cosPhi1" or r["_field"] == "cosPhi2" or r["_field"] == "cosPhi3" or r["_field"] == "current2" or r["_field"] == "current1" or r["_field"] == "current3" or r["_field"] == "pf1" or r["_field"] == "pf2" or r["_field"] == "pf3" or r["_field"] == "reactivePower1" or r["_field"] == "reactivePower2" or r["_field"] == "reactivePower3" or r["_field"] == "thdi2" or r["_field"] == "thdi3" or r["_field"] == "thdv1" or r["_field"] == "thdi1" or r["_field"] == "thdv2" or r["_field"] == "thdv3" or r["_field"] == "voltageLL1" or r["_field"] == "voltageLL2" or r["_field"] == "voltageLN1" or r["_field"] == "voltageLN2" or r["_field"] == "voltageLL3" or r["_field"] == "voltageLN3" or r["_field"] == "totalActivePower" or r["_field"] == "totalApparentPower" or r["_field"] == "totalAvg.Volt(L-L)" or r["_field"] == "totalAvg.Volt(L-N)" or r["_field"] == "totalCurrent" or r["_field"] == "totalFreq" or r["_field"] == "totalPF" or r["_field"] == "totalReactivePower")
  |> aggregateWindow(every: ${aggregate}, fn: mean, createEmpty: false)
  |> sort(columns: ["_time"], desc: true)`;

  try {
    const result = await queryApi.collectRows(fluxQuery);
    // console.log("result data:", result);
    return result;
  } catch (err) {
    console.error(`Error querying InfluxDB}:`, err);
    throw new Error(`Failed to fetch data from InfluxDB`);
  }
}

module.exports = {
  fetchDataAggregate,
};
