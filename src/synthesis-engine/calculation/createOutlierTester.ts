import { getMean } from "./utils/getMean";
import { Point } from "./types";
import { getVariance } from "./utils/getVariance";

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
