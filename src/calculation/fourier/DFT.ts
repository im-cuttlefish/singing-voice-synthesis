import { sigma, prod, cis, toComplex } from "../utils/complex";
import { SignalSegment, Frequency } from "../types";

export const DFT = (segment: SignalSegment): Frequency => {
  const freqency: Frequency = [];
  const N = segment.length;

  for (let k = 0; k < N; k++) {
    const sum = sigma(0, N - 1, (i) => {
      return prod(toComplex(segment[i]), cis((-2 * Math.PI * k * i) / N));
    });

    freqency.push(sum);
  }

  return freqency;
};
