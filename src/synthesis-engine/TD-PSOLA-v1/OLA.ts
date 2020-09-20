import { SignalSegment } from "../calculation/types";
import { SplittedForm } from "./types";

export const OLA = ({ splitted, pitchMark }: SplittedForm): SignalSegment => {
  const segment: SignalSegment = [];
  const firstMark = pitchMark[0];

  for (let i = 0; i < splitted.length; i++) {
    const piece = splitted[i];
    const mark = pitchMark[i] - firstMark;

    for (let t = 0; t < piece.length; t++) {
      segment[t + mark] ??= 0;
      segment[t + mark] += piece[t];
    }
  }

  for (let i = 0; i < segment.length; i++) {
    segment[i] ??= 0;
  }

  return segment;
};
