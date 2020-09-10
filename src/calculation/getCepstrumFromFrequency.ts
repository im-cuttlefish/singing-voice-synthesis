import { Frequency } from "./types";
import { abs, toComplex } from "./complex";
import { IDFT } from "./IDFT";

export const getCepstrumFromFrequency = (freqency: Frequency) => {
  return IDFT(freqency.map((z) => toComplex(Math.log(abs(z)))));
};
