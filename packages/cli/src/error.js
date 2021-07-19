import chalk from "chalk";
import { exit } from "process";

export const error = message => {
  console.error(`${chalk.red("Error:")} ${message}`);
  exit(1);
};
