import { MonoralAudioData } from "../../audio/types";
import { createTrimMeanGetter } from "../../calculation/statistics/createTrimMeanGetter";
import { adjustPitchMark } from "./adjustPitchMark";
import { getPitchMark } from "./getPitchMark";
import { getPitchTransition } from "./getPitchTransition";
import { Attributes } from "./types";

export const getAttributes = (audioData: MonoralAudioData): Attributes => {
  const { sampleRate } = audioData;
  const pitchTransition = getPitchTransition(audioData);
  const F0 = getTrimMean(pitchTransition);
  const pitchMark = getPitchMark(audioData, F0);

  return { sampleRate, F0, pitchMark };
};

const getTrimMean = createTrimMeanGetter(0.25);
