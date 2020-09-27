import { createBinarySearch } from "../utils/createBinarySearch";
import { Point } from "../utils/types";
import { Interpolator } from "./types";

export const createLinearInterpolator: Interpolator = (points: Point[]) => {
  return (x: number) => {
    const binarySearch = createBinarySearch((y: Point) => y[0] >= x);
    let i = binarySearch(points) - 1;
    i = i < 0 ? 0 : i >= points.length - 2 ? points.length - 2 : i;

    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];

    return ((y1 - y0) / (x1 - x0)) * (x - x0) + y0;
  };
};
