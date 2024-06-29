const express = require("express");
const router = express.Router();
const Hourly = require("../Controller/aggregate");

router.get("/aggregate", Hourly.aggregateHourlyData);

module.exports = router;
