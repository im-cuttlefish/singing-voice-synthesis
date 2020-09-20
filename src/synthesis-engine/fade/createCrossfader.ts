import { Crossfader, FadeFunction } from "./types";

interface CrossfadeRules {
  fader: FadeFunction;
  duration: number;
}

export const createCrossfader = ({
  fader,
  duration,
}: CrossfadeRules): Crossfader => {
  return function* () {
    const fn = fader(duration);
    let [fadeOut, fadeIn] = yield null;

    for (let i = 0; i < duration; i++) {
      const merged = fn(i) * fadeIn + fn(duration - i) * fadeOut;
      [fadeOut, fadeIn] = yield merged;
    }
  };
};
