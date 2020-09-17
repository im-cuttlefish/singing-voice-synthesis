import { SignalSegment } from "./calculation/types";
import { PitchMark } from "./attributes/types";

export interface SignalSegmentWithAttributes {
  segment: SignalSegment;
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}
