import { Point } from "./types";

export const getGradient = ([x0, y0]: Point, [x1, y1]: Point) => {
  return (y1 - y0) / (x1 - x0);
};
