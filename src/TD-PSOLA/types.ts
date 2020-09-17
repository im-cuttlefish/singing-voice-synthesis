import { PitchMark } from "@/attributes/types";
import { SignalSegment } from "@/calculation/types";

export interface SignalSegmentWithAttributes {
  segment: SignalSegment;
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}

export interface Transform {
  F0?: number;
  duration?: number;
}

export interface SplittedForm {
  T0: number;
  pitchMark: PitchMark;
  splitted: SignalSegment[];
}
