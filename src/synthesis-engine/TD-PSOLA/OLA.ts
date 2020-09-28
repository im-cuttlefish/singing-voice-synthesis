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
    const location = prevIndex + locatedDelta;
    const intergral = Math.floor(location);
    const piece = pieces[pieceIndex];

    for (let i = 0; i < piece.length; i++) {
      segment[intergral + i] ??= 0;
      segment[intergral + i] += piece[i];
    }

    prevIndex = location;
  }

  for (let i = 0; i < segment.length; i++) {
    segment[i] ??= 0;
  }

  return segment;
};
