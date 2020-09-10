import { abs } from "./complex";
import { Frequency, Spectrum } from "./types";

export const getSpectrumFromFrequency = (frequency: Frequency): Spectrum => {
  return frequency.map((z) => abs(z));
};
