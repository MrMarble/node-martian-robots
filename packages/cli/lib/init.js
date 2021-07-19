const { parseInputFile } = require("./parseInput");
const { Expedition } = require("core");
const { writeFile } = require("fs/promises");
const { error } = require("./error");
const { interactive } = require("./interactive");

const init = async (options) => {
  if (options.interactive) {
    await interactive();
    return;
  }

  if (!options.source) {
    error(`No source file specified.`);
  }

  const input = await parseInputFile(options.source);

  const exp = new Expedition(...input.shift());
  for (const robot of input) {
    const movements = robot[1];
    const [x, y, orientation] = robot[0];
    exp.addRobot(movements, parseInt(x), parseInt(y), orientation);
  }
  const output = exp.processMovements().join("\n");

  if (options.output) {
    await writeFile(options.output, output);
    console.log(`File written to ${options.output}`);
  } else {
    console.log(output);
  }
};

module.exports = {
  init,
};
