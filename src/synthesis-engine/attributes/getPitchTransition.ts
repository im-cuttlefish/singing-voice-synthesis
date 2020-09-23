import { MonoralAudioData } from "../../audio/types";
import { getCepstrumFromFrequency } from "../../calculation/signal-processing/getCepstrumFromFrequency";
import { takeMaximum } from "../../calculation/utils/takeMaximum";
import { STFTAnalyzer } from "./analyzer";
import { createBandpassFilter } from "../../calculation/signal-processing/createBandpassFilter";
import { PitchTransition } from "./types";

export const getPitchTransition = (audioData: MonoralAudioData) => {
  const { sampleRate } = audioData;
  const source = audioData.source();

  const STFT = STFTAnalyzer();
  const bandpass = createBandpassFilter(Math.floor(sampleRate / 880), 512);

  const pitchMark: PitchTransition = [];
  let count = 0;

  for (const signal of source) {
    count++;
    const passedTime = count / audioData.sampleRate;
    const frequency = STFT.next(signal).value;

    if (!frequency) {
      continue;
    }

    const cepstrum = getCepstrumFromFrequency(frequency);
    const cutCepstrum = bandpass(cepstrum);
    const max = takeMaximum(cutCepstrum);

    pitchMark.push([passedTime, sampleRate / max[0]]);
  }

  return pitchMark;
};
