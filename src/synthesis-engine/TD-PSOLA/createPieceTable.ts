import { PitchMark } from "../attributes/types";
import { PieceTable } from "./types";

export const createPieceTable = (pitchMark: PitchMark): PieceTable => {
  const pieceTable: PieceTable = [[0, 0]];

  for (let i = 1; i < pitchMark.length; i++) {
    const delta = pitchMark[i] - pitchMark[i - 1];
    pieceTable.push([i, delta]);
  }

  return pieceTable;
};
