const express = require("express");
const router = express.Router();
const harmonic = require("../Controller/harmonic");

router.get("/stream/:slaveId", harmonic.harmonicData);
router.get("/range/:slaveId", harmonic.harmonicDataRange);

module.exports = router;
