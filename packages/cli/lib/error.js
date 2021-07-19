const chalk = require("chalk");
const { exit } = require("process");

const error = (message) => {
  console.error(`${chalk.red("Error:")} ${message}`);
  exit(1);
};

module.exports = { error };
