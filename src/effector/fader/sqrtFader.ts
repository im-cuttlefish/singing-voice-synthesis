import type { FadeFunction } from "./types";

export const sqrtFader: FadeFunction = (duration: number) => {
  return (x: number) => {
    return Math.sqrt(x / duration);
  };
};
