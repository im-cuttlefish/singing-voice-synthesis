export type PitchTransition = [number, number][];
export type PitchMark = number[];

export interface Attributes {
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}
