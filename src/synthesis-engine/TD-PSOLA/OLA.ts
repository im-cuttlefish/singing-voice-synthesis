import { SignalSegment } from "@/calculation/signal-processing/types";
import { Piece, PieceTable } from "./types";

interface OLARules {
  pieces: Piece[];
  pieceTable: PieceTable;
}

export const OLA = ({ pieces, pieceTable }: OLARules): SignalSegment => {
  const segment: SignalSegment = [];
  let prevIndex = 0;

  for (let i = 0; i < pieceTable.length; i++) {
    const [pieceIndex, locatedDelta] = pieceTable[i];
    const locatedIndex = prevIndex + locatedDelta;
    const piece = pieces[pieceIndex];

    for (let k = 0; k < piece.length; k++) {
      segment[locatedIndex + k] ??= 0;
      segment[locatedIndex + k] += piece[k];
    }

    prevIndex += locatedDelta;
  }

  for (let i = 0; i < segment.length; i++) {
    segment[i] ??= 0;
  }

  return segment;
};
