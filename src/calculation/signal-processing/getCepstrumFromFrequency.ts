import { abs, toComplex } from "../utils/complex";
import { IDFT } from "./IDFT";
import type { Frequency } from "./types";

export const getCepstrumFromFrequency = (freqency: Frequency) => {
  return IDFT(freqency.map((z) => toComplex(Math.log(abs(z)))));
};
