import { createCubicSpline } from "@/calculation/interpolation/createCubicSpline";
import { SignalSegment } from "@/calculation/signal-processing/types";
import { Point } from "@/calculation/utils/types";
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
    const piece = pieces[pieceIndex];

    if (Number.isInteger(location)) {
      for (let k = 0; k < piece.length; k++) {
        segment[location + k] ??= 0;
        segment[location + k] += piece[k];
      }

      prevIndex = location;
      continue;
    }

    const intergral = Math.floor(location);
    const fractional = location - intergral;
    const points: Point[] = [];

    for (let i = 0; i < piece.length; i++) {
      points[i] = [i, piece[i]];
    }

    const interpolator = createCubicSpline(points);

    for (let i = 0; i < piece.length; i++) {
      segment[intergral + i] ??= 0;
      segment[intergral + i] += interpolator(fractional + i);
    }

    prevIndex = location;
  }

  for (let i = 0; i < segment.length; i++) {
    segment[i] ??= 0;
  }

  return segment;
};
