import { WindowFunction } from "./types";

export const hannWindow: WindowFunction = (width) => (x) => {
  return width * (1 - Math.cos((2 * Math.PI * x) / width));
};
