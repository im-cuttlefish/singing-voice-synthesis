import { FadeFunction } from "./types";

export const linearFader: FadeFunction = (duration: number) => {
  return (x: number) => x / duration;
};
