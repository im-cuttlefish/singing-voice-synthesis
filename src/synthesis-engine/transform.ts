import { Attributes } from "./attributes/types";
import { MonoralAudioData } from "../audio/types";
import { createFadeOuter } from "../effector/fader/createFadeOuter";
import { sinusFader } from "../effector/fader/sinusFader";
import { TD_PSOLA } from "./TD-PSOLA/TD-PSOLA";
import { CorpusItem } from "./TD-PSOLA/types";

interface TransformRules {
  F0: number;
  duration: number;
  attributes: Attributes;
  audioData: MonoralAudioData;
}

export const transform = ({
  F0,
  duration,
  attributes,
  audioData,
}: TransformRules) => {
  const { sampleRate } = attributes;
  const durationCount = Math.floor(duration * sampleRate);
  const fadeOutCount = Math.floor(fadeOutSec * sampleRate);

  const fadeOuter = createFadeOuter({
    fader: sinusFader,
    duration: fadeOutCount,
  });

  const source = [...audioData.source()];
  const corpus: CorpusItem = { ...attributes, segment: source };
  const segment = TD_PSOLA(corpus, { F0, duration });

  segment.splice(durationCount);
  const offset = segment.length - fadeOutCount;
  const fadeOut = fadeOuter();
  fadeOut.next(segment[offset]);

  for (let i = 1; i < fadeOutCount; i++) {
    const signal = segment[offset + i];
    const { value } = fadeOut.next(signal);

    if (!value) {
      continue;
    }

    segment[offset + i] = value;
  }

  return segment;
};

const fadeOutSec = 0.1;
