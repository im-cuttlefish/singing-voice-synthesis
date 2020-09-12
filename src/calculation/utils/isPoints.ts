import { Point } from "../types";

export const isPoints = (fn: number[] | Point[]): fn is Point[] => {
  return Array.isArray(fn[0]);
};
