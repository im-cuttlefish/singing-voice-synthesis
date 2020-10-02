import { IDFT } from "./IDFT";
import { toComplex, prod } from "../utils/complex";
import type { SignalSegment } from "../signal-processing/types";
import type { ISTFTAnalyzer } from "./types";
import type { WindowFunction, Walker } from "../window/types";

interface ISTFTRules {
  walker: Walker;
  window: WindowFunction;
}

export const createISTFTAnalyzer = ({
  walker,
  window,
}: ISTFTRules): ISTFTAnalyzer => {
  const { size, frameShift } = walker.spec;
  const pad: SignalSegment = Array(frameShift).fill(0);

  return function* () {
    const overlap: SignalSegment = Array(size).fill(0);
    let frequency = yield null;

    while (1) {
      const fn = window(frequency.length);
      const signal = IDFT(frequency.map((x, i) => prod(x, toComplex(fn(i)))));

      for (let i = 0; i < signal.length; i++) {
        overlap[i] += signal[i];
      }

      frequency = yield overlap.splice(0, frameShift);
      overlap.splice(0, 0, ...pad);
    }
  };
};
