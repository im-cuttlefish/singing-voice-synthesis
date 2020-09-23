import { hannWindow } from "@/calculation/window/hannWindow";
import { SignalSegment } from "@/calculation/signal-processing/types";
import { isWithIn } from "./utils/isWithIn";
import { CorpusItem, Piece } from "./types";

export const createPieces = (corpusItem: CorpusItem): Piece[] => {
  const { segment, sampleRate, F0, pitchMark } = corpusItem;
  const pieces: Piece[] = [];
  const T0 = Math.floor(sampleRate / F0);
  const hann = hannWindow(2 * T0);

  for (let i = 0; i < pitchMark.length; i++) {
    const mark = pitchMark[i];
    const piece: SignalSegment = [];
    pieces.push(piece);

    for (let t = -T0; t <= T0; t++) {
      const signal = isWithIn(mark + t, segment) ? segment[mark + t] : 0;
      piece.push(signal * hann(t + T0));
    }
  }

  return pieces;
};
