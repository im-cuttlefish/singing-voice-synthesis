import { abs } from "../utils/complex";
import { Frequency, Spectrum } from "./types";

export const getSpectrumFromFrequency = (frequency: Frequency): Spectrum => {
  return frequency.map((z) => abs(z));
};
