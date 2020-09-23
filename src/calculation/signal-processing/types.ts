import { Complex } from "../utils/types";

export type SignalSegment = number[];

export type Frequency = Complex[];

export type Cepstrum = Complex[];

export type Spectrum = number[];

export type STFTAnalyzer = () => Generator<Frequency | null, void, number>;

export type ISTFTAnalyzer = () => Generator<
  SignalSegment | null,
  void,
  Frequency
>;
