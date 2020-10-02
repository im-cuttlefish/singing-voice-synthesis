import type { SignalSegment } from "./types";

export const createSmoother = (level: number) => {
  return (fn: SignalSegment): SignalSegment => {
    const segment: SignalSegment = [];

    for (let i = 0; i < fn.length; i++) {
      const mean = meanWithIn(fn, i, i + level);
      segment.push(mean);
    }

    return segment;
  };
};

const meanWithIn = (fn: SignalSegment, from: number, by: number) => {
  by = by < fn.length ? by : fn.length;
  let sum = 0;

  for (let i = from; i <= by; i++) {
    sum += fn[i];
  }

  return sum / (by - from);
};
