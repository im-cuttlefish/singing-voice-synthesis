import { Crossfader, FadeFunction } from "./types";

interface CrossfadeRules {
  fader: FadeFunction;
  duration: number;
}

export const createCrossfader = ({
  fader,
  duration: overlap,
}: CrossfadeRules): Crossfader => {
  return function* () {
    const fn = fader(overlap);
    let [fadeOut, fadeIn] = yield null;

    for (let i = 0; i < overlap; i++) {
      const merged = fn(i) * fadeIn + fn(overlap - i) * fadeOut;
      [fadeOut, fadeIn] = yield merged;
    }
  };
};
