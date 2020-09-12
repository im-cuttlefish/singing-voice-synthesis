import { AudioData } from "@/audio/types";
import { createTrimMeanGetter } from "@/calculation/createTrimMeanGetter";
import { getPitchMark } from "./getPitchMark";
import { getPitchTransition } from "./getPitchTransition";
import { PreAnalyzedData } from "./types";

export const getPreAnalyzedData = (audioData: AudioData): PreAnalyzedData => {
  if (audioData.type !== "monoral") {
    throw new Error(
      `The format "${audioData.type} is not supported currently."`
    );
  }

  const { sampleRate } = audioData;
  const pitchTransition = getPitchTransition(audioData);
  const F0 = getTrimMean(pitchTransition);
  const pitchMark = getPitchMark(audioData, F0);

  return { sampleRate, F0, pitchMark };
};

const getTrimMean = createTrimMeanGetter(0.25);
