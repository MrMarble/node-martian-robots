import { test } from "uvu";
import { Expedition } from "../src/Expedition";
import * as assert from "uvu/assert";

test("isInBounds", () => {
  const exp = new Expedition(2, 2);

  assert.ok(exp["isInBounds"](0, 0));
  assert.ok(exp["isInBounds"](1, 1));
  assert.not.ok(exp["isInBounds"](1, 3));
});

test("process movements correctly", () => {
  const exp = new Expedition(5, 3);
  exp.addRobot(1, 1, "E", ["R", "F", "R", "F", "R", "F", "R", "F"]);
  exp.addRobot(3, 2, "N", ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"]);
  exp.addRobot(0, 3, "W", ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"]);
  assert.equal(exp.processMovements(), ["1 1 E", "3 3 N LOST", "2 3 S"]);
});
