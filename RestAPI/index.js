const express = require("express");
const cors = require("cors");
const port = 3002;
const app = express();

const routerHeartbeat = require("./Router/sensorStatus");
const routerDahboard = require("./Router/dashboard");
const router3phase = require("./Router/3phase");
const overview = require("./Router/kwh");
const phasePower = require("./Router/phasePower");
const harmonic = require("./Router/harmonic");

app.use(cors());
app.get("/", (req, res) => {
  res.json("server up & running!");
});

app.use("/api/device-manager", routerHeartbeat);
app.use("/api/dashboard", routerDahboard);
app.use("/api/3-phase", router3phase);
app.use("/api/overview", overview);
app.use("/api/phase-power", phasePower);
app.use("/api/harmonic", harmonic);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
