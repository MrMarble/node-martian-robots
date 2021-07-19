const chalk = require("chalk");
const { isValidMovement } = require("core");
const { Expedition } = require("core/dist/Expedition");
const inquirer = require("inquirer");

const logo = () => {
  const spaceShip =
    "202020202020202020202020202020202020202020602e205f5f5f0a20202020202020202020202020202020202020205f5f2c27205f5f602e202020202020202020202020202020205f2e2e2d2d2d2d2e2e2e2e5f5f5f5f0a20202020202020205f5f2e2e2e2d2d2e2760603b2e2020202c2e2020203b60602d2d2e2e5f5f20202020202e27202020202c2d2e5f202020205f2e2d270a20205f2e2e2d27272d2d2d2d2d2d2d2720202060272020206027202020602720202020204f2060602d27272e5f202020282c3b2729205f2c270a2c275f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f20202020202020202020202020202020202020202020202020205c602d2e5f602d272c270a20602e5f202020202020202020202020202060606060606060606060602d2d2d2d2d2d2e2e2e5f5f5f202020272d2e2e5f272d3a0a202020206060602d2d2e2e5f2020202020202c2e202020204d41525449414e20202020202020202020606060602d2d2e2e2e5f5f5c2d2e0a202020202020202020202020602e2d2d2e20602d6020202020202020524f424f5453202020202020202020205f5f5f5f202020207c20207c600a2020202020202020202020202020602e20602e20202020202020202020202020202020202020202020202c2760606060602e20203b20203b600a20202020202020202020202020202020602e5f602e20202020202020205f5f5f5f5f5f5f5f5f5f202020602e2020202020205c275f5f2f600a20202020202020202020202020202020202020602d3a2e5f5f5f5f5f2f5f5f5f5f5f5f2f5f5f5f2f5f5f5f5f602e20202020205c2020600a202020202020202020202020202020202020202020202020202020202020207c20202020202020602e5f20202020602e202020205c0a20202020202020202020202020202020202020202020202020202020202020602e5f5f5f5f5f5f5f5f5f602d2e202020602e202020602e5f5f5f0a2020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020602d2d2d2d2d2d2760";
  const ascii = [];
  for (let i = 0; i < spaceShip.length; i += 2) {
    ascii.push(String.fromCharCode(parseInt(spaceShip.substr(i, 2), 16)));
  }
  console.log(chalk.green(ascii.join("")));
};

const collectAnswers = async (inputs = []) => {
  const { again, ...answers } = await inquirer.prompt([
    {
      type: "number",
      message: "Robot X coordinate",
      name: "x",
    },
    {
      type: "number",
      message: "Robot Y coordinate",
      name: "y",
    },
    {
      type: "list",
      message: "Robot Orientation",
      name: "orientation",
      choices: ["N", "E", "S", "W"],
    },
    {
      type: "input",
      message: "Robot Movements. F => Forward; L => Turn Left; R => Turn Right.\nEg: FRFFL",
      name: "movements",
      validate(value) {
        return isValidMovement(value.trim()) ? true : "Please type valid movements only";
      },
    },
    {
      type: "confirm",
      message: "Add another robot?",
      name: "again",
      default: true,
    },
  ]);

  const newRobots = [...inputs, answers];
  return again ? collectAnswers(newRobots) : newRobots;
};

const interactive = async () => {
  logo();

  const { width, height } = await inquirer.prompt([
    {
      type: "number",
      message: "Sector width?",
      name: "width",
    },
    {
      type: "number",
      message: "Sector height?",
      name: "height",
    },
  ]);
  const robots = await collectAnswers();

  const exp = new Expedition(width, height);
  robots.forEach(({ movements, x, y, orientation }) => exp.addRobot(movements, x, y, orientation));
  console.log("Output:");
  console.log(exp.processMovements().join("\n"));
};

module.exports = { interactive };
