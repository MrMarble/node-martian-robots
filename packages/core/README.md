# Martian Robots Core

This package holds the logic of the coding challenge.

## Logic

The surface of Mars is for some reason a grid and to find out why, you have to send some robots to explore.

You have to specify the size of the sector to explore (size of the grid).

When sending a robot, you have to specify the initial position and orientation and then the route to follow.

If a robot leaves the sector, it will leave a beacon before losing the signal, thus preventing another robot from getting lost in the same place.

## Installation

You can install this package to use in your scripts with

```
yarn add mrmarble/node-martian-robots-core
```

## Usage

```javascript
import { Expedition } from "@mrmarble/martian-robots-core";

// Create new expedition with width and height
const exp = new Expedition(5, 3);

// Add a robot to the expedition
exp
  .addRobot(["F", "R", "L"], 1, 1, "E") // Chaining supported
  .addRobot("FFRLFLL", 1, 2, "S")
  .addRobot("FFRLFLL", new Robot(3, 2, "W"));

const result = exp.processMovements(); // Calculate all robot positions

console.log(result.join("\n")); // Print the output => 2 1 E ...
```

## Testing

I have chosen `uvu` for testing because it's fast and with a small footprint, giving the low complexity of the problem and size of code I think it makes more sense than a bigger one like `jest`. _494kb vs 24.9Mb_
