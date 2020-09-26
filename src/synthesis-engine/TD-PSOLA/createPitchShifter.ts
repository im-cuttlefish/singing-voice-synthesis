import { F0Transition, Metadata, PieceTable } from "./types";

export const createPitchShifter = (F0Transition: F0Transition) => {
  return (pieceTable: PieceTable, meta: Metadata): PieceTable => {
    const result: PieceTable = [];
    let passed = 0;

    for (let i = 0; i < pieceTable.length; i++) {
      const [pieceIndex, locatedDelta] = pieceTable[i];
      const progress = locatedDelta / meta.sampleRate;
      const F0 = F0Transition(passed + progress);
      const T0Ratio = meta.F0 / F0;

      result[i] = [pieceIndex, T0Ratio * locatedDelta];
      passed += progress;
    }

    return result;
  };
};
