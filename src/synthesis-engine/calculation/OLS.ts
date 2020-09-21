import { Point } from "./types";

export const OLS = (points: Point[]): [number, number] => {
  const N = points.length;

  let meanX = 0;
  let meanY = 0;
  let covXY = 0;
  let varX = 0;

  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    meanX += x;
    meanY += y;
    covXY += x * y;
    varX += x ** 2;
  }

  meanX /= N;
  meanY /= N;
  covXY /= N;
  covXY -= meanX * meanY;
  varX /= N;
  varX -= meanX ** 2;

  const A = covXY / varX;
  const B = meanY - A * meanX;

  return [A, B];
};
