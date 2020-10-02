import { getMean } from "./getMean";
import { getVariance } from "./getVariance";
import type { Point } from "../utils/types";

export const createOutlierTester = (level: number) => {
  return (fn: number[]) => {
    const outlier: Point[] = [];
    const mean = getMean(fn);
    const SD = Math.sqrt(getVariance(fn));

    const isOutlier = (y: number) => {
      return Math.abs(y - mean) / SD > level;
    };

    for (let x = 0; x < fn.length; x++) {
      if (isOutlier(fn[x])) {
        outlier.push([x, fn[x]]);
      }
    }

    return outlier;
  };
};
