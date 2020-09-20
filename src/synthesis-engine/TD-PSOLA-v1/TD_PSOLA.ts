import { SignalSegment } from "../calculation/types";
import { SignalSegmentWithAttributes } from "./types";
import { splitSignalSegment } from "./splitSignalSegment";
import { OLA } from "./OLA";
import { shiftPitch } from "./shiftPitch";
import { stretchDuration } from "./stretchDuration";
import { Transform } from "./types";

export const TD_PSOLA = (
  from: SignalSegmentWithAttributes,
  { F0, duration }: Transform
): SignalSegment => {
  F0 ??= from.F0;
  duration ??= from.segment.length / from.sampleRate;

  const { segment, sampleRate } = from;
  const prevDuration = segment.length / sampleRate;
  const F0Ratio = F0 / from.F0;

  const base = splitSignalSegment(from);
  const stretched = stretchDuration(base, (F0Ratio * duration) / prevDuration);
  const pitchShifted = shiftPitch(stretched, 1 / F0Ratio);
  const signal = OLA(pitchShifted);

  return signal;
};
