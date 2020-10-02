import type { Point } from "../utils/types";

export const createCubicHermiteSpline = (
  [x0, y0]: Point,
  [x1, y1]: Point,
  G0: number,
  G1: number
) => {
  G0 *= x1 - x0;
  G1 *= x1 - x0;
  const A = 2 * (y0 - y1) + G0 + G1;
  const B = -3 * (y0 - y1) - 2 * G0 - G1;

  return (x: number) => {
    const u = (x - x0) / (x1 - x0);
    return A * u ** 3 + B * u ** 2 + G0 * u + y0;
  };
};
