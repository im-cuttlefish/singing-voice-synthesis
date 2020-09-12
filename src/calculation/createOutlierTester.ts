import { getMean } from "./utils/getMean";
import { Point } from "./types";

export const createOutlierTester = (level: number) => {
  return (fn: number[]) => {
    const outlier: Point[] = [];
    const mean = getMean(fn);
    const SD = Math.sqrt(getVariance(fn));

    const isOutlier = (y: number) => {
      return (y - mean) / SD > level;
    };

    for (let x = 0; x < fn.length; x++) {
      if (isOutlier(fn[x])) {
        outlier.push([x, fn[x]]);
      }
    }

    return outlier;
  };
};

const getVariance = (fn: number[]) => {
  return fn.reduce((S, y) => S + y ** 2, 0) / fn.length;
};
