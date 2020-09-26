import { createBinarySearch } from "../utils/createBinarySearch";
import { TDMA } from "../utils/TDMA";
import { Point, TDMatrix } from "../utils/types";
import { Interpolator } from "./types";

export const createCubicSpline: Interpolator = (points) => {
  const coefficient = getCoefficient(points);
  const right = getRight(points);
  const U = [0, ...TDMA(coefficient, right), 0];
  const A: number[] = [];
  const B: number[] = [];
  const C: number[] = [];

  for (let i = 0; i < U.length - 1; i++) {
    const x0 = points[i][0];
    const x1 = points[i + 1][0];
    const D = getDerivative(points[i + 1], points[i]);

    A[i] = (U[i + 1] - U[i]) / (6 * (x1 - x0));
    B[i] = U[i] / 2;
    C[i] = D - (1 / 6) * (x1 - x0) * (2 * U[i] + U[i + 1]);
  }

  return (x: number) => {
    const binarySearch = createBinarySearch((y: Point) => y[0] >= x);
    const i = binarySearch(points) - 1;

    if (i < 0 || i >= points.length - 1) {
      return 0;
    }

    const [x0, y0] = points[i];
    const p = x - x0;

    return A[i] * p ** 3 + B[i] * p ** 2 + C[i] * p + y0;
  };
};

const getCoefficient = (points: Point[]) => {
  const N = points.length;
  const coefficient: TDMatrix = [];

  for (let i = 0; i < N - 2; i++) {
    const h0 = points[i + 1][0] - points[i][0];
    const h1 = points[i + 2][0] - points[i + 1][0];

    if (i === 0) {
      coefficient[i] = [2 * (h0 + h1), h1, 0];
      continue;
    }

    if (i === N - 3) {
      coefficient[i] = [h0, 2 * (h0 + h1), 0];
      break;
    }

    coefficient[i] = [h0, 2 * (h0 + h1), h1];
  }

  return coefficient;
};

const getRight = (points: Point[]) => {
  const N = points.length;
  const right: number[] = [];

  for (let i = 0; i < N - 2; i++) {
    const D0 = getDerivative(points[i], points[i + 1]);
    const D1 = getDerivative(points[i + 1], points[i + 2]);
    right[i] = 6 * (D1 - D0);
  }

  return right;
};

const getDerivative = ([x0, y0]: Point, [x1, y1]: Point) => {
  return (y1 - y0) / (x1 - x0);
};
