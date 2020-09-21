import { Attributes } from "../attributes/types";
import { MonoralAudioData } from "../audio/types";
import { SignalSegment } from "../calculation/types";
import { createCrossfader } from "../fade/createCrossfader";
import { createFadeOuter } from "../fade/createFadeOuter";
import { linearFader } from "../fade/linearFader";
import { TD_PSOLA } from "../TD-PSOLA-v1/TD_PSOLA";
import { SignalSegmentWithAttributes } from "../TD-PSOLA-v1/types";
import { takeVowelSegment } from "./takeVowelSegment";

interface TransformRules {
  F0: number;
  duration: number;
  attributes: Attributes;
  audioData: MonoralAudioData;
}

const overlapSec = 0.3;
const fadeOutSec = 0.1;

export const transform = ({
  F0,
  duration,
  attributes,
  audioData,
}: TransformRules) => {
  const { sampleRate } = attributes;
  const durationCount = Math.floor(duration * sampleRate);
  const overlapCount = Math.floor(overlapSec * sampleRate);
  const fadeOutCount = Math.floor(fadeOutSec * sampleRate);

  const crossfader = createCrossfader({
    fader: linearFader,
    duration: overlapCount,
  });

  const fadeOuter = createFadeOuter({
    fader: linearFader,
    duration: fadeOutCount,
  });

  const consonant: SignalSegmentWithAttributes = {
    ...attributes,
    segment: [...audioData.source()],
  };

  const vowel = takeVowelSegment(attributes, audioData);

  const consonantSegment = TD_PSOLA(consonant, { F0 });
  const vowelSegment = TD_PSOLA(vowel, { F0, duration: duration + overlapSec });
  const merged: SignalSegment = [];

  // 子音部分
  for (let i = 0; i < consonantSegment.length - overlapCount; i++) {
    merged[i] = consonantSegment[i];
  }

  // 子音・母音のクロスフェードによる接続
  const crossfade = crossfader();
  crossfade.next([consonantSegment[0], vowelSegment[0]]);
  const offset = consonantSegment.length - overlapCount - 1;

  for (let i = 0; i < overlapCount; i++) {
    const consonant = consonantSegment[offset + i];
    const vowel = vowelSegment[i];
    const { value } = crossfade.next([consonant, vowel]);

    if (!value) {
      continue;
    }

    merged[offset + i] = value;
  }

  // 母音部分
  for (let i = 0; i < vowelSegment.length - overlapCount; i++) {
    merged[i + consonantSegment.length] = vowelSegment[i + overlapCount];
  }

  merged.splice(durationCount);
  const fadeOut = fadeOuter();
  const offset2 = merged.length - fadeOutCount;
  fadeOut.next(merged[offset2]);

  // 微小時間のフェードアウト
  for (let i = 0; i < fadeOutCount; i++) {
    const signal = merged[offset2 + i];
    const { value } = fadeOut.next(signal);

    if (!value) {
      continue;
    }

    merged[offset2 + i] = value;
  }

  return merged;
};
