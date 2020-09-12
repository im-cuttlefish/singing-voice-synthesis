import { SignalSegment } from "./calculation/types";
import { PitchMark } from "./pre-analyze/types";

export interface PreAnalyzedSignalSegment {
  segment: SignalSegment;
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}
