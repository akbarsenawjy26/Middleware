const { CronJob } = require("cron");
const dataAggregate = require("./Controller/aggregate");

const cronList = () => {
  new CronJob(
    "0 * * * *",
    dataAggregate.executeHourly,
    null,
    true,
    "Asia/Jakarta"
  );

  new CronJob(
    "5 0 * * *",
    dataAggregate.executeDaily,
    null,
    true,
    "Asia/Jakarta"
  );

  new CronJob(
    "10 0 1 * *",
    dataAggregate.executeMonthly,
    null,
    true,
    "Asia/Jakarta"
  );
};

module.exports = cronList;
