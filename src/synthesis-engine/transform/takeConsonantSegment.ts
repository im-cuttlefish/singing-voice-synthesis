import { Attributes } from "../attributes/types";
import { MonoralAudioData } from "../audio/types";
import { SignalSegmentWithAttributes } from "../TD-PSOLA/types";

export const takeConsonantSegment = (
  { F0, pitchMark, sampleRate }: Attributes,
  audioData: MonoralAudioData
): SignalSegmentWithAttributes => {
  const segment = [...audioData.source()];
  const quarterIndex = Math.floor((2 * pitchMark.length) / 3);
  const quarterMark = pitchMark[quarterIndex];

  const cutPitchMark = pitchMark.slice(0, quarterIndex);
  const cutSegment = segment.slice(0, Math.ceil(quarterMark + 1 / F0));

  return {
    F0,
    sampleRate,
    pitchMark: cutPitchMark,
    segment: cutSegment,
  };
};
