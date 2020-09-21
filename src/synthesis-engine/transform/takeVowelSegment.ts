import { Attributes, PitchMark } from "../attributes/types";
import { MonoralAudioData } from "../audio/types";
import { SignalSegmentWithAttributes } from "../TD-PSOLA/types";

export const takeVowelSegment = (
  { F0, pitchMark, sampleRate }: Attributes,
  audioData: MonoralAudioData
): SignalSegmentWithAttributes => {
  const segment = [...audioData.source()];
  const quarterIndex = Math.floor(pitchMark.length / 3);
  const quarterMark = pitchMark[quarterIndex];

  const cutPitchMark = moveParallel(quarterMark, pitchMark.slice(quarterIndex));
  const cutSegment = segment.slice(Math.floor(quarterMark - 1 / F0));

  return {
    F0,
    sampleRate,
    pitchMark: cutPitchMark,
    segment: cutSegment,
  };
};

const moveParallel = (x: number, pitchMark: PitchMark): PitchMark => {
  const result: PitchMark = [];

  for (let i = 0; i < pitchMark.length; i++) {
    result.push(pitchMark[i] - x);
  }

  return result;
};
