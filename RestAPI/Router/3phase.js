const express = require("express");
const router = express.Router();
const phase = require("../Controller/3phase");

router.get("/stream/:slaveId", phase.phaseData);
router.get("/range/:slaveId", phase.phaseDataRange);

module.exports = router;
