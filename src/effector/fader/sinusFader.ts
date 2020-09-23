import { FadeFunction } from "./types";

export const sinusFader: FadeFunction = (duration: number) => {
  return (x: number) => {
    return Math.sin((Math.PI / 2) * (x / duration));
  };
};
