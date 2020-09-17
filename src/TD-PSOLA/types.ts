import { PitchMark } from "@/attributes/types";
import { SignalSegment } from "@/calculation/types";

export interface Transform {
  F0?: number;
  duration?: number;
}

export interface SplittedForm {
  T0: number;
  pitchMark: PitchMark;
  splitted: SignalSegment[];
}
