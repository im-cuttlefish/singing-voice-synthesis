import { CorpusItem, Metadata } from "./types";

export const getCorpusMetadata = (corpusItem: CorpusItem): Metadata => {
  const { sampleRate, F0, segment } = corpusItem;
  const duration = segment.length / sampleRate;

  return { sampleRate, F0, duration };
};
