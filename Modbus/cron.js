const { CronJob } = require("cron");
const sqlEnergyMeter = require("./Controller/sql_energyMeter");
const cronList = () => {
  new CronJob("0 * * * *", sqlEnergyMeter.execute, null, true, "Asia/Jakarta");
};

module.exports = cronList;
