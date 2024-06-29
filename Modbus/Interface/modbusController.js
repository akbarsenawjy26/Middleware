const apiStreaming = () => {
  return {
    DataBasic: dataBasic(),
    DataCommon: dataCommon(),
  };
};

const dataBasic = () => {
  return {
    voltageLN1: 0,
    voltageLL1: 0,
    current1: 0,
    cosPhi1: 0,
    pf1: 0,
    activePower1: 0,
    reactivePower1: 0,
    apparentPower1: 0,
    thdv1: 0,
    thdi1: 0,
    voltageLN2: 0,
    voltageLL2: 0,
    current2: 0,
    cosPhi2: 0,
    pf2: 0,
    activePower2: 0,
    reactivePower2: 0,
    apparentPower2: 0,
    thdv2: 0,
    thdi2: 0,
    voltageLN3: 0,
    voltageLL3: 0,
    current3: 0,
    cosPhi3: 0,
    pf3: 0,
    activePower3: 0,
    reactivePower3: 0,
    apparentPower3: 0,
    thdv3: 0,
    thdi3: 0,
  };
};

const dataCommon = () => {
  return {
    totalAvgVoltLN: 0,
    totalAvgVoltLL: 0,
    totalCurrent: 0,
    totalPF: 0,
    totalActivePower: 0,
    totalReactivePower: 0,
    totalApparentPower: 0,
    totalFreq: 0,
    NeutralCurrent: 0,
  };
};
module.exports = { apiStreaming, dataBasic, dataCommon };
