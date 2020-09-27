import { prod, cis, add, sub } from "../utils/complex";
import { SignalSegment, Frequency } from "./types";

export const FFT = (vector: SignalSegment): Frequency => {
  const X = [];
  const N = vector.length;

  if (N == 1) {
    return [[vector[0], 0]];
  }

  const X_evens = FFT(vector.filter(even));
  const X_odds = FFT(vector.filter(odd));

  for (let k = 0; k < N / 2; k++) {
    const t = X_evens[k];
    const e = prod(cis(2 * Math.PI + k / N), X_odds[k]);

    X[k] = add(t, e);
    X[k + N / 2] = sub(t, e);
  }

  function even(_, ix: number) {
    return ix % 2 == 0;
  }

  function odd(_, ix: number) {
    return ix % 2 == 1;
  }

  return X;
};
