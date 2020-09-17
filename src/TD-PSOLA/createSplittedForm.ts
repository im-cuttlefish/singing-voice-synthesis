import { hannWindow } from "../calculation/hannWindow";
import { SignalSegment } from "../calculation/types";
import { SignalSegmentWithAttributes, SplittedForm } from "./types";
import { isWithIn } from "./utils/isWithIn";

export const createSplittedForm = (
  from: SignalSegmentWithAttributes
): SplittedForm => {
  const { segment, pitchMark, sampleRate, F0 } = from;
  const T0 = Math.floor(sampleRate / F0);

  const splitted: SignalSegment[] = [];
  const hann = hannWindow(2 * T0);

  for (const mark of pitchMark) {
    const piece: SignalSegment = [];
    splitted.push(piece);

    for (let t = -T0; t <= T0; t++) {
      const signal = isWithIn(mark + t, segment) ? segment[mark + t] : 0;
      piece.push(signal * hann(t + T0));
    }
  }

  return { T0, splitted, pitchMark };
};
