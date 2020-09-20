import { Attributes } from "../attributes/types";
import { MonoralAudioData } from "../audio/types";
import { SignalSegment } from "../calculation/types";
import { createCrossfader } from "../fade/createCrossfader";
import { sinusFader } from "../fade/sinusFader";
import { TD_PSOLA } from "../TD-PSOLA-v1/TD_PSOLA";
import { SignalSegmentWithAttributes } from "../TD-PSOLA-v1/types";
import { createVowel } from "./createVowel";

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
  const merge = Math.floor(0.3 * attributes.sampleRate);

  const crossfader = createCrossfader({
    fader: sinusFader,
    duration: merge,
  });

  const vowel = createVowel(attributes, audioData);
  const consonant: SignalSegmentWithAttributes = {
    ...attributes,
    segment: [...audioData.source()],
  };

  const consonantSegment = TD_PSOLA(consonant, { F0 });
  const vowelSegment = TD_PSOLA(vowel, { F0, duration });
  const segment: SignalSegment = [];

  for (let i = 0; i < consonantSegment.length - merge; i++) {
    segment[i] = consonantSegment[i];
  }

  const crossfade = crossfader();
  crossfade.next([consonantSegment[0], vowelSegment[0]]);
  const offset = consonantSegment.length - merge - 1;

  for (let i = 0; i < merge; i++) {
    const consonant = consonantSegment[offset + i];
    const vowel = vowelSegment[i];
    const { value } = crossfade.next([consonant, vowel]);

    if (!value) {
      continue;
    }

    segment[offset + i] = value;
  }

  for (let i = 0; i < vowelSegment.length - merge; i++) {
    segment[i + consonantSegment.length] = vowelSegment[i + merge];
  }

  return segment;
};
