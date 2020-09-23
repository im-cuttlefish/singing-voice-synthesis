import { Crossfader, FaderRules } from "./types";

export const createCrossfader = ({
  fader,
  duration,
}: FaderRules): Crossfader => {
  return function* () {
    const fn = fader(duration);
    let [fadeOut, fadeIn] = yield null;

    for (let i = 0; i <= duration; i++) {
      const merged = fn(i) * fadeIn + fn(duration - i) * fadeOut;
      [fadeOut, fadeIn] = yield merged;
    }
  };
};
