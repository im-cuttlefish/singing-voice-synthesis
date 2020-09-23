import { Fader, FaderRules } from "./types";

export const createFadeOuter = ({ fader, duration }: FaderRules): Fader => {
  return function* () {
    const fn = fader(duration);
    let fadeOut = yield null;

    for (let i = 0; i <= duration; i++) {
      const faded = fn(duration - i) * fadeOut;
      fadeOut = yield faded;
    }
  };
};
