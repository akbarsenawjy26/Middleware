const ModbusRTU = require("modbus-serial");

class ModbusModel {
  constructor(ip, id) {
    this.ip = ip;
    this.client = new ModbusRTU();
  }

  async connect() {
    try {
      await this.client.connectTCP(this.ip, { port: 502, timeout: 1000 });
      console.log(`Connected to Modbus TCP at ${this.ip}`);
    } catch (err) {
      console.error(`Error connecting to Modbus TCP at ${this.ip}:`, err);
      // throw err;
    }
  }

  async readRegisters(startAddress, numRegisters, slaveId) {
    try {
      if (!this.client.isOpen) {
        await this.connect();
      }
      this.client.setTimeout(3000);
      this.client.setID(slaveId);
      const data = await this.client.readHoldingRegisters(startAddress, numRegisters);
      console.log(slaveId, data.data);
      return data.data;
    } catch (error) {
      console.log("Error Read Register:", slaveId);
      // return Array(77).fill(0);
      return null;
    }
  }
}

module.exports = ModbusModel;
