import { SignalSegment } from "../signal-processing/types";
import { Walker, WalkerSpec } from "./types";

export const createWalker = (spec: WalkerSpec): Walker => {
  const { size, frameShift } = spec;

  const impl = function* () {
    let segment: SignalSegment = [];

    while (segment.length < size) {
      segment.push(yield null);
    }

    while (1) {
      const x = yield segment;
      segment = [...segment];
      segment.shift();
      segment.push(x);

      for (let swapped = 1; swapped < frameShift; swapped++) {
        const x = yield null;
        segment.shift();
        segment.push(x);
      }
    }
  };

  return { impl, spec };
};
