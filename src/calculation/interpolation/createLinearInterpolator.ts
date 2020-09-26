import { createBinarySearch } from "../utils/createBinarySearch";
import { Point } from "../utils/types";
import { Interpolator } from "./types";

export const createLinearInterpolator: Interpolator = (points: Point[]) => {
  return (x: number) => {
    const binarySearch = createBinarySearch((y: Point) => y[0] >= x);
    const i = binarySearch(points) - 1;

    if (i < 0 || i >= points.length - 1) {
      return 0;
    }

    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];

    return ((y1 - y0) / (x1 - x0)) * (x - x0) + y0;
  };
};
