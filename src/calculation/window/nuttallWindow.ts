import type { WindowFunction } from "./types";

export const nuttallWindow: WindowFunction = (width) => {
  const cos = (x: number) => Math.cos(2 * Math.PI * (x / width));

  return (x) => {
    return a0 - a1 * cos(x) + a2 * cos(2 * x) - a3 * cos(3 * x);
  };
};

const a0 = 0.355768;
const a1 = 0.487396;
const a2 = 0.144232;
const a3 = 0.012604;
