import { Orientation, OrientationEnum } from "./types";

export class Robot {
  private position: [number, number] = [0, 0];
  private orientation: OrientationEnum = OrientationEnum.N;
  private lost = false;

  constructor();
  constructor(position: [number, number], orientation: Orientation);
  constructor(position?: [number, number], orientation?: Orientation) {
    if (position) {
      this.position = position;
    }
    if (orientation) {
      this.orientation = OrientationEnum[orientation];
    }
  }

  toString(): string {
    return `${this.position.join(" ")} ${OrientationEnum[this.orientation]} ${this.lost ? "LOST" : ""}`.trim();
  }

  private calculatePosition(): [number, number] {
    const [x, y] = this.position;
    if ([OrientationEnum.N, OrientationEnum.S].includes(this.orientation)) {
      const dy = this.orientation === OrientationEnum.N ? 1 : -1;
      return [x, y + dy];
    } else {
      const dx = this.orientation === OrientationEnum.E ? 1 : -1;
      return [x + dx, y];
    }
  }

  public turnLeft(): Robot {
    if (this.orientation === OrientationEnum.N) {
      this.orientation = OrientationEnum.W;
    } else {
      this.orientation--;
    }
    return this;
  }

  public turnRight(): Robot {
    if (this.orientation === OrientationEnum.W) {
      this.orientation = OrientationEnum.N;
    } else {
      this.orientation++;
    }
    return this;
  }

  public moveForward(): Robot {
    this.position = this.calculatePosition();
    return this;
  }

  public isLost(): boolean {
    return this.lost;
  }

  public setLost(lost: boolean): Robot {
    this.lost = lost;
    return this;
  }

  public getPosition(): [number, number] {
    return this.position;
  }

  public setPosition(position: [number, number]): Robot {
    this.position = position;
    return this;
  }

  public setOrientation(orientation: Orientation): Robot {
    this.orientation = OrientationEnum[orientation];
    return this;
  }

  public getOrientation(): string {
    return OrientationEnum[this.orientation];
  }

  public nextPosition(): [number, number] {
    return this.calculatePosition();
  }
}
