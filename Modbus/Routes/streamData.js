const express = require("express");
const router = express.Router();
const restApi = require("../Controller/modbus");

router.get("/stream/:slaveId", restApi.restApiController);

module.exports = router;
