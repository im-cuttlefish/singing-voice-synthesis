import { DFT } from "./DFT";
import { SignalSegment, WindowFunction, Walker, STFTAnalyzer } from "../types";

interface STFTRules {
  walker: Walker;
  window: WindowFunction;
}

export const createSTFTAnalyzer = ({
  walker,
  window,
}: STFTRules): STFTAnalyzer => {
  return function* () {
    const walk = walker.impl();
    let segment: SignalSegment | null | void = null;

    while (1) {
      if (segment) {
        const fn = window(segment.length);
        const frequency = DFT(segment.map((x, i) => x * fn(i)));
        const x = yield frequency;
        segment = walk.next(x).value;
        continue;
      }

      const x = yield null;
      segment = walk.next(x).value;
    }
  };
};
