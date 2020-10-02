import { Point } from "../utils/types";

export type Interpolator = (points: Point[]) => (x: number) => number;

export abstract class ModifiableInterpolator {
  readonly points: readonly Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  abstract replace(index: number, point: Point): void;
  abstract add(point: Point): void;
  abstract remove(index: number): void;
  abstract interpolate(x: number): number;
}
