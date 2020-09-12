export type PitchTransition = [number, number][];
export type PitchMark = number[];

export interface PreAnalyzedData {
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}
