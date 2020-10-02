import { createBinarySearch } from "../utils/createBinarySearch";
import { getGradient } from "../utils/getGradient";
import { Point } from "../utils/types";
import { createCubicHermiteSpline } from "./createCubicHermiteSpline";
import { ModifiableInterpolator } from "./types";

export class CatmullRomSpline extends ModifiableInterpolator {
  points: Point[];
  private splineManager: SplineManager;

  constructor(points: Point[]) {
    super(points);
    this.points = [...points];
    this.splineManager = new SplineManager(this.points);
  }

  add = (point: Point) => {
    const N = this.points.length;
    const binarySearch = createBinarySearch((p: Point) => p[0] >= point[0]);
    let i = binarySearch(this.points);
    i = i < 0 ? 0 : i >= N - 2 ? N - 2 : i;

    this.splineManager.points.splice(i, 0, point);
    this.splineManager.splines.splice(i, 0, () => 0);
    this.splineManager.update(i - 2, i + 1);
  };

  remove = (index: number) => {
    this.splineManager.points.splice(index, 1);
    this.splineManager.splines.splice(index, 1);
    this.splineManager.update(index - 2, index);
  };

  replace = (index: number, point: Point) => {
    this.splineManager.points[index] = point;
    this.splineManager.update(index - 2, index + 1);
  };

  interpolate = (x: number) => {
    const N = this.points.length;
    const binarySearch = createBinarySearch((p: Point) => p[0] >= x);
    let i = binarySearch(this.points) - 1;
    i = i < 0 ? 0 : i >= N - 2 ? N - 2 : i;

    const spline = this.splineManager.splines[i];
    return spline(x);
  };
}

class SplineManager {
  points: Point[];
  splines: ((x: number) => number)[];

  constructor(points: Point[]) {
    this.points = points;
    this.splines = [];
    this.update();
  }

  update = (from = 0, by = Infinity) => {
    const N = this.points.length;
    from = from < 0 ? 0 : from;
    by = by > N - 2 ? N - 2 : by;

    for (let i = from; i <= by; i++) {
      if (i === 0) {
        this.createStartSpline();
        continue;
      }

      if (i === N - 2) {
        this.createEndSpline();
        break;
      }

      this.createSpline(i);
    }
  };

  private createStartSpline = () => {
    const [P0, P1, P2] = this.points;
    const [x1, y1] = P1;
    const G0 = getGradient(P0, P1);
    const G1 = getGradient(P0, P2);
    const A = (G0 - G1) / (P0[0] - P1[0]);

    this.splines[0] = (x: number) => {
      return A * (x - x1) ** 2 + G1 * (x - x1) + y1;
    };
  };

  private createEndSpline = () => {
    const N = this.points.length;
    const [P0, P1, P2] = this.points.slice(N - 3);
    const [x1, y1] = P1;
    const G0 = getGradient(P2, P1);
    const G1 = getGradient(P2, P0);
    const A = (G0 - G1) / (P2[0] - P1[0]);

    this.splines[N - 2] = (x: number) => {
      return A * (x - x1) ** 2 + G1 * (x - x1) + y1;
    };
  };

  private createSpline = (index: number) => {
    const [P0, P1, P2, P3] = this.points.slice(index - 1, index + 3);
    const G0 = getGradient(P0, P2);
    const G1 = getGradient(P1, P3);

    this.splines[index] = createCubicHermiteSpline(P1, P2, G0, G1);
  };
}
