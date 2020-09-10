export type SignalSegment = number[];

export type Complex = [number, number];

export type Frequency = Complex[];

export type Cepstrum = Complex[];

export type Spectrum = number[];

export type STFTAnalyzer = () => Generator<Frequency | null, void, number>;

export type ISTFTAnalyzer = () => Generator<
  SignalSegment | null,
  void,
  Frequency
>;

export type WindowFunction = (width: number) => (x: number) => number;

export type Walker = {
  impl: () => Generator<SignalSegment | null, void, number>;
  spec: WalkerSpec;
};

export type WalkerSpec = {
  size: number;
  frameShift: number;
};
