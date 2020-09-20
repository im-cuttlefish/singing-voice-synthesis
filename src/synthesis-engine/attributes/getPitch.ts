import { getCepstrumFromFrequency } from "../calculation/getCepstrumFromFrequency";
import { createBandpassFilter } from "../calculation/createBandpassFilter";
import { takeMaximum } from "../calculation/takeMaximum";
import { STFTAnalyzer } from "./analyzer";
import { PitchTransitionAnalyzer } from "./types";

export const getPitchTransition: PitchTransitionAnalyzer = function* (
  sampleRate: number
) {
  const STFT = STFTAnalyzer();
  const bandpass = createBandpassFilter(Math.floor(sampleRate / 880), 512);

  let signal = yield null;
  let count = 0;

  while (1) {
    count++;
    const passedTime = count / sampleRate;
    const frequency = STFT.next(signal).value;

    if (!frequency) {
      continue;
    }

    const cepstrum = getCepstrumFromFrequency(frequency);
    const cutCepstrum = bandpass(cepstrum);
    const max = takeMaximum(cutCepstrum);

    signal = yield [passedTime, sampleRate / max[0]];
  }
};
