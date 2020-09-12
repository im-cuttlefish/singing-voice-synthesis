import { hannWindow } from "./calculation/hannWindow";
import { SignalSegment } from "./calculation/types";
import { PreAnalyzedSignalSegment } from "./types";

interface Transform {
  F0?: number;
  duration?: number;
}

export const TD_PSOLA = (
  from: PreAnalyzedSignalSegment,
  { F0, duration }: Transform
): SignalSegment => {
  const { segment, sampleRate, pitchMark } = from;
  const prevT0 = Math.floor(sampleRate / from.F0);
  const splitted: SignalSegment[] = [];
  const hann = hannWindow(2 * prevT0);

  for (const mark of pitchMark) {
    const parts: SignalSegment = [];
    splitted.push(parts);

    for (let t = -prevT0; t <= prevT0; t++) {
      const signal = isWithIn(t + mark, segment) ? segment[t + mark] : 0;
      parts.push(signal * hann(t + prevT0));
    }
  }

  const result: SignalSegment = [];
  F0 ??= from.F0;
  duration ??= segment.length / sampleRate;
  const nextT0 = Math.floor(sampleRate / F0);
  const prevDuration = segment.length / sampleRate;
  const ratio = duration / prevDuration;

  for (let i = 0; i < splitted.length; i++) {
    const parts = splitted[i];

    for (let t = 0; t < parts.length; t++) {
      result[t + i * nextT0] ??= 0;
      result[t + i * nextT0] += parts[t];
    }
  }

  return result;
};

const isWithIn = (x: number, fn: number[]) => {
  return 0 <= x && x < fn.length;
};
