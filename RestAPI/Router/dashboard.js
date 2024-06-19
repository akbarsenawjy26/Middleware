const express = require("express");
const router = express.Router();
const dashboard = require("../Controller/dashboard");

router.get("/:slaveId", dashboard.DashboardData);

module.exports = router;
