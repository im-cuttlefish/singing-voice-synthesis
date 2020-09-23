import { SignalSegment } from "../signal-processing/types";

export type WindowFunction = (width: number) => (x: number) => number;

export type Walker = {
  impl: () => Generator<SignalSegment | null, void, number>;
  spec: WalkerSpec;
};

export type WalkerSpec = {
  size: number;
  frameShift: number;
};
