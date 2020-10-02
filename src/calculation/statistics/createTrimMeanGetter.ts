import { isPoints } from "../utils/isPoints";
import { getMean } from "./getMean";
import type { Point } from "../utils/types";

export const createTrimMeanGetter = (ratio: number) => {
  return (fn: number[] | Point[]) => {
    const threshold = Math.floor(ratio * fn.length);
    const projected = isPoints(fn) ? fn.map((x) => x[1]) : fn;
    const sorted = [...projected].sort((a, b) => (a < b ? -1 : 1));
    const trimmed = sorted.slice(threshold, -threshold);

    return getMean(trimmed);
  };
};
