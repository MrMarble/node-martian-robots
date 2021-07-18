const fs = require("fs");
const readline = require("readline");
const { isValidOrientation, isValidMovement } = require("core");
/**
 * Reads a file and returns the content as a array
 *
 * @param {string} path
 * @returns {Promise<string[][]>}
 */
const parseInputFile = async (path) => {
  if (!fs.existsSync(path)) {
    throw new Error(`File ${path} does not exist`);
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  const data = [];
  let lineNumber = 0;
  let robots = 0;
  return new Promise((resolve, reject) => {
    rl.on("line", (line) => {
      if (lineNumber === 0) {
        // First line is the size of the map
        data.push(line.split(" "));
      } else if (lineNumber % 2 !== 0) {
        // Odd lines are the coordinates of the robot
        const [x, y, orientation] = line.split(" ");
        if (isNaN(x) || isNaN(y) || !isValidOrientation(orientation)) {
          throw new Error(`Line ${lineNumber + 1} is invalid: ${line}`);
        }
        data.push([[x, y, orientation]]);
        robots++;
      } else {
        // Even lines are the robot movements
        if (!isValidMovement(line)) {
          throw new Error(`Line ${lineNumber + 1} is invalid: ${line}`);
        }
        data[robots].push(line.split(""));
      }

      lineNumber++;
    });

    rl.on("close", () => {
      resolve(data);
    });
  });
};

module.exports = {
  parseInputFile,
};
