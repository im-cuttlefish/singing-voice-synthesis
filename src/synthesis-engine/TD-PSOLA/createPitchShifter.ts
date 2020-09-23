import { Metadata, PieceTable } from "./types";

export const createPitchShifter = (F0: number) => {
  return (pieceTable: PieceTable, meta: Metadata): PieceTable => {
    const result: PieceTable = [];
    const T0Ratio = meta.F0 / F0;

    for (let i = 0; i < pieceTable.length; i++) {
      const [pieceIndex, locatedDelta] = pieceTable[i];
      result.push([pieceIndex, Math.floor(T0Ratio * locatedDelta)]);
    }

    return result;
  };
};
