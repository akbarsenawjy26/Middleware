const express = require("express");
const router = express.Router();
const phasePower = require("../Controller/phasePower");

router.get("/stream/:slaveId", phasePower.phasePowerData);
router.get("/range/:slaveId", phasePower.phasePowerDataRange);

module.exports = router;
