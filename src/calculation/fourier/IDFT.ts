import { sigma, prod, cis } from "../utils/complex";
import { SignalSegment, Frequency } from "../types";

export const IDFT = (frequency: Frequency): SignalSegment => {
  const segment: SignalSegment = [];
  const N = frequency.length;

  for (let k = 0; k < N; k++) {
    const sum = sigma(0, N - 1, (i) => {
      return prod(frequency[i], cis((2 * Math.PI * k * i) / N));
    });

    segment.push((1 / N) * sum[0]);
  }

  return segment;
};
