import { test } from "uvu";
import { Robot, isValidOrientation, isValidMovement } from "../src/Robot";
import * as assert from "uvu/assert";

test("toString returns position and orientation", () => {
  const robot = new Robot([1, 1], "N");

  assert.is(robot.toString(), "1 1 N");
  assert.is(robot.setLost(true).toString(), "1 1 N LOST");
});

test("move forward increases 'y' by 1", () => {
  const robot = new Robot([1, 1], "N");

  robot.moveForward();

  assert.is(robot.getPosition()[1], 2);
});

test("going south decreases 'y' by 1", () => {
  const robot = new Robot([1, 1], "S");

  robot.moveForward();

  assert.is(robot.getPosition()[1], 0);
});

test("going west decreases 'x' by 1", () => {
  const robot = new Robot([1, 1], "N");
  robot.turnLeft();
  robot.moveForward();
  assert.is(robot.getPosition()[0], 0);
});

test("isValidOrientation", () => {
  const cases: Array<[string, boolean]> = [
    ["N", true],
    ["S", true],
    ["E", true],
    ["W", true],
    ["NE", false],
  ];

  cases.forEach(([orientation, expected]) => {
    assert.is(isValidOrientation(orientation), expected, orientation);
  });
});

test("isValidMovement", () => {
  const cases: Array<[string, boolean]> = [
    ["F", true],
    ["R", true],
    ["L", true],
    ["FRL", true],
    ["FFRRLL", true],
    ["FFRRLLN", false],
  ];
  cases.forEach(([movement, expected]) => {
    assert.is(isValidMovement(movement), expected, movement);
  });
});
test.run();
