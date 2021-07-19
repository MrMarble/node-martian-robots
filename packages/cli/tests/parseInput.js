const { test } = require("uvu");
const assert = require("uvu/assert");
const { parseInputFile } = require("../src/parseInput");

test(`parseInput`, async (t) => {
  assert.equal(await parseInputFile("tests/fixtures/input.txt"), [
    ["5", "3"],
    [
      ["1", "1", "E"],
      ["R", "F", "R", "F", "R", "F", "R", "F"],
    ],
    [
      ["3", "2", "N"],
      ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"],
    ],
    [
      ["0", "3", "W"],
      ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"],
    ],
  ]);
});

test.run();
