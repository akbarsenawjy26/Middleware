const convertRegistersToFloat = (highRegister, lowRegister) => {
  const combinedRegisters = (highRegister << 16) | (lowRegister & 0xffff);
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(combinedRegisters, 0);
  return buffer.readFloatBE(0);
};

const convertRegistersToInt32 = (highRegister, lowRegister) => {
  const combinedRegisters = (highRegister << 16) | (lowRegister & 0xffff);
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(combinedRegisters, 0);
  return buffer.readInt32BE(0);
};

module.exports = {
  convertRegistersToFloat,
  convertRegistersToInt32,
};
