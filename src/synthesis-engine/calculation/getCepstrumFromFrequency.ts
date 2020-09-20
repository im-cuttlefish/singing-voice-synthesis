import { Frequency } from "./types";
import { abs, toComplex } from "./utils/complex";
import { IDFT } from "./fourier/IDFT";

export const getCepstrumFromFrequency = (freqency: Frequency) => {
  return IDFT(freqency.map((z) => toComplex(Math.log(abs(z)))));
};
