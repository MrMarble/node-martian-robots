import { Robot } from "./Robot";
import { isMovement, Movement, Orientation } from "./types";

export class Expedition {
  private width: number;
  private height: number;
  private robots: Array<[Robot, Array<Movement>]> = [];
  private beacons: Set<string> = new Set();

  constructor(width: string | number, height: string | number) {
    this.width = typeof width === "string" ? parseInt(width) : width + 1;
    this.height = typeof height === "string" ? parseInt(height) : height + 1;
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  private parseMovements(movements: string): Array<Movement> {
    const _movements: Array<Movement> = [];
    movements.split("").forEach((movement: string) => {
      if (isMovement(movement)) {
        _movements.push(movement);
      }
    });
    return _movements;
  }

  /**
   * Add a robot to the expedition
   * @param movements Movements the robot can make
   * @param robot Robot to add
   */
  addRobot(movements: Array<Movement> | string, robot: Robot): Expedition;
  /**
   * @param movements Movements the robot can make
   * @param x X position of the robot
   * @param y Y position of the robot
   * @param orientation Initial orientation of the robot
   */
  addRobot(movements: Array<Movement> | string, x: number, y: number, orientation: Orientation): Expedition;
  addRobot(movements: any, xOrRobot: any, y?: number, orientation?: Orientation): Expedition {
    let _movements: Array<Movement> = [];
    let _robot: Robot = new Robot();

    if (xOrRobot instanceof Robot) {
      _robot = xOrRobot;
    } else if (y !== undefined && orientation !== undefined) {
      _robot = new Robot([xOrRobot, y], orientation);
    }

    if (typeof movements === "string") {
      _movements = this.parseMovements(movements);
    } else {
      _movements = movements;
    }

    this.robots.push([_robot, _movements]);

    return this;
  }

  getRobots(): Array<[Robot, Array<Movement>]> {
    return this.robots;
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
