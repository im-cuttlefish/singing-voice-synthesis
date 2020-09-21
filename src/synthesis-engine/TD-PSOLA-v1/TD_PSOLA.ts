import { SignalSegment } from "../calculation/types";
import { SignalSegmentWithAttributes } from "./types";
import { splitSignalSegment } from "./splitSignalSegment";
import { OLA } from "./OLA";
import { shiftPitch } from "./shiftPitch";
import { stretchDuration } from "./stretchDuration";
import { Transform } from "./types";

export const TD_PSOLA = (
  from: SignalSegmentWithAttributes,
  { F0 = from.F0, duration }: Transform
): SignalSegment => {
  const { segment, sampleRate } = from;
  const prevDuration = segment.length / sampleRate;
  const F0Ratio = F0 / from.F0;

  let splitted = splitSignalSegment(from);

  if (duration) {
    splitted = stretchDuration(splitted, (F0Ratio * duration) / prevDuration);
  }

  const pitchShifted = shiftPitch(splitted, 1 / F0Ratio);
  const signal = OLA(pitchShifted);

  return signal;
};
