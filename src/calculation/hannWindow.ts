import { WindowFunction } from "./types";

export const hannWindow: WindowFunction = (width) => {
  return (x) => {
    return 0.5 - 0.5 * Math.cos((2 * Math.PI * x) / width);
  };
};
