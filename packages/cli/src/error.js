import { red } from "chalk";
import { exit } from "process";

export const error = (message) => {
  console.error(`${red("Error:")} ${message}`);
  exit(1);
};
