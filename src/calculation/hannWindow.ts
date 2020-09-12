import { WindowFunction } from "./types";

export const hannWindow: WindowFunction = (width) => {
  return (x) => {
    return 1 - Math.cos((2 * Math.PI * x) / width);
  };
};
