import { MonoralAudioData } from "@/audio/types";
import { createWalker } from "@/calculation/createWalker";
import { takeMaximum } from "@/calculation/takeMaximum";
import { PitchMark } from "./types";

export const getPitchMark = (audioData: MonoralAudioData, F0: number) => {
  const { sampleRate } = audioData;
  const source = audioData.source();
  const pitchMark: PitchMark = [];

  const size = Math.floor(sampleRate / F0);
  const walker = createWalker({ size, frameShift: size });
  const walk = walker.impl();

  let count = 0;

  for (const signal of source) {
    count++;
    const segment = walk.next(signal).value;

    if (!segment) {
      continue;
    }

    const max = takeMaximum(segment);
    pitchMark.push(count - (segment.length - max[0]));
  }

  return pitchMark;
};
