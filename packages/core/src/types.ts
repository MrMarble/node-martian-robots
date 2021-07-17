export type Orientation = "N" | "S" | "E" | "W";

export enum OrientationEnum {
  N,
  E,
  S,
  W,
}

export type Movement = "L" | "R" | "F";

export function isMovement(x: string): x is Movement {
  return x === "L" || x === "R" || x === "F";
}
