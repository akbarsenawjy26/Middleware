const express = require("express");
const router = express.Router();
const deviceManager = require("../Controller/heartBeat");

router.get("/", deviceManager.DeviceManager);

module.exports = router;
