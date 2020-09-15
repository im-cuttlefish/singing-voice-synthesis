export type PitchTransition = [number, number][];
export type PitchMark = number[];

export interface Attributes {
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}

export type PitchTransitionAnalyzer = (
  sampleRate: number
) => Generator<[number, number] | null, void, number>;
