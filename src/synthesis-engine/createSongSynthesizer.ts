import { SignalSegment } from "@/calculation/signal-processing/types";
import { transform } from "./transform";
import { Corpus, Score } from "./types";

export const createSongSynthesizer = ({ sampleRate, phonemes }: Corpus) => {
  return (score: Score) => {
    const result: SignalSegment = [];

    for (const note of score) {
      const { phoneme, duration, F0, from } = note;
      const location = Math.floor(from * sampleRate);
      const corpusItem = phonemes[phoneme];

      if (!corpusItem) {
        throw new Error(`The phoneme "${phoneme}"`);
      }

      const { attributes, audioData } = corpusItem;
      const segment = transform({ attributes, audioData, F0, duration });

      for (let i = 0; i < segment.length; i++) {
        result[location + i] = segment[i];
      }
    }

    for (let i = 0; i < result.length; i++) {
      result[i] ??= 0;
    }

    return result;
  };
};
