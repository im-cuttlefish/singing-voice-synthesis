import { Point } from "./types";
import { isPoints } from "./utils/isPoints";

export const takeMaximum = (fn: number[] | Point[]): Point => {
  if (isPoints(fn)) {
    let max: Point = [0, 0];

    for (let i = 0; i < fn.length; i++) {
      if (fn[i][1] > max[1]) {
        max = fn[i];
      }
    }

    return [...max];
  }

  let max: Point = [0, 0];

  for (let i = 0; i < fn.length; i++) {
    if (fn[i] > max[1]) {
      max = [i, fn[i]];
    }
  }

  return max;
};
