const express = require("express");
const modbusController = require("./Controller/modbus");
const cronList = require("./cron");
const restApirRoutes = require("./Routes/streamData");
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  modbusController.execute();
  cronList();
  app.use("/api", restApirRoutes);
});
