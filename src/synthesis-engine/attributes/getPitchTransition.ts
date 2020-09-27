import { MonoralAudioData } from "../../audio/types";
import { getCepstrumFromFrequency } from "../../calculation/signal-processing/getCepstrumFromFrequency";
import { takeMaximum } from "../../calculation/utils/takeMaximum";
import { STFTAnalyzer } from "./analyzer";
import { PitchTransition } from "./types";

export const getPitchTransition = (audioData: MonoralAudioData) => {
  const { sampleRate } = audioData;
  const source = audioData.source();

  const STFT = STFTAnalyzer();
  const extractor = createExtractor(Math.floor(sampleRate / 880), 512);

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
    const cutCepstrum = extractor(cepstrum);
    const max = takeMaximum(cutCepstrum);

    pitchMark.push([passedTime, sampleRate / max[0]]);
  }

  return pitchMark;
};

const createExtractor = (from: number, morf: number) => {
  const leftPad = Array(from).fill(0);
  const rightPad = Array(morf).fill(0);

  return (f: number[]) => [...leftPad, ...f.slice(from, -morf), ...rightPad];
};
