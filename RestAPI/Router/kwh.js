const express = require("express");
const router = express.Router();
const overview = require("../Controller/kwh");

router.get("/stream/:slaveId", overview.dataKwhStream);
router.get("/periodic/:slaveId", overview.dataKwhPeriodic);

module.exports = router;
