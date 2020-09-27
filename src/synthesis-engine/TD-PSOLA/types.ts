import { PitchMark } from "../attributes/types";
import { SignalSegment } from "@/calculation/signal-processing/types";

export interface CorpusItem {
  segment: SignalSegment;
  sampleRate: number;
  F0: number;
  pitchMark: PitchMark;
}

export interface Metadata {
  sampleRate: number;
  F0: number;
  duration: number;
}

export type Piece = number[];

export type PieceTable = [pieceIndex: number, locationDelta: number][];

export type F0Transition = (t: number) => number;
