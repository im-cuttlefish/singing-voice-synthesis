import { Fader, FadeFunction } from "./types";

interface CrossfadeRules {
  fader: FadeFunction;
  duration: number;
}

export const createFadeOuter = ({ fader, duration }: CrossfadeRules): Fader => {
  return function* () {
    const fn = fader(duration);
    let fadeOut = yield null;

    for (let i = 0; i < duration; i++) {
      const faded = fn(duration - i) * fadeOut;
      fadeOut = yield faded;
    }
  };
};
