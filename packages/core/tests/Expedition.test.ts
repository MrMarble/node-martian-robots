import { test } from "uvu";
import { Expedition } from "../src/Expedition";
import * as assert from "uvu/assert";
import { Robot } from "../src/Robot";
import { Movement } from "../src/types";

test("isInBounds", () => {
  const exp = new Expedition(2, 2);

  // Use brackets to call private methods with type checking
  assert.ok(exp["isInBounds"](0, 0));
  assert.ok(exp["isInBounds"](1, 1));
  assert.not.ok(exp["isInBounds"](1, 3));
});

test("addRobot overloads", () => {
  const exp = new Expedition(2, 2);

  const movementsArray: Array<Movement> = ["R", "F"];
  const movementsString = "RF";
  const robot = new Robot([1, 1], "N");

  assert.ok(exp.addRobot(movementsArray, robot));
  assert.ok(exp.addRobot(movementsString, robot));
  assert.ok(exp.addRobot(movementsArray, 1, 1, "E"));
  assert.ok(exp.addRobot(movementsString, 1, 1, "E"));
  assert.equal(exp.getRobots().length, 4);
});

test("process movements correctly", () => {
  const exp = new Expedition(5, 3);

  exp.addRobot(["R", "F", "R", "F", "R", "F", "R", "F"], 1, 1, "E");
  exp.addRobot(["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"], 3, 2, "N");
  exp.addRobot(["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"], 0, 3, "W");

  assert.equal(exp.processMovements(), ["1 1 E", "3 3 N LOST", "2 3 S"]);
});

test.run();
