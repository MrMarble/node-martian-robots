import { Robot } from "./Robot";
import { Movement, Orientation } from "./types";

export class Expedition {
  private width: number;
  private height: number;
  private robots: Array<[Robot, Array<Movement>]> = [];
  private beacons: Set<String> = new Set();

  constructor(width: number, height: number) {
    this.width = width + 1;
    this.height = height + 1;
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  addRobot(x: number, y: number, orientation: Orientation, movements: Array<Movement>): Expedition {
    this.robots.push([new Robot([x, y], orientation), movements]);

    return this;
  }

  processMovements(): string[] {
    return this.robots.map(([robot, movements]) => {
      for (const movement of movements) {
        // If the robot is at the edge of the map, it can't move there.
        if (robot.isLost()) {
          break;
        }

        if (movement === "F") {
          const [nextX, nextY] = robot.nextPosition();
          const willBeLost = !this.isInBounds(nextX, nextY);

          // If the robot is going to be lost, check if it's on a beacon.
          if (willBeLost) {
            const [x, y] = robot.getPosition();

            // If there is a beacon at the robot's position, it will not be lost.
            if (this.beacons.has(`${x},${y}`)) {
              continue;
            }

            this.beacons.add(`${x},${y}`);
            robot.setLost(true);

            continue;
          }

          robot.moveForward();
        } else if (movement === "L") {
          robot.turnLeft();
        } else if (movement === "R") {
          robot.turnRight();
        }
      }
      return robot.toString();
    });
  }
}
