import { Metadata, PieceTable } from "./types";
import { repeat } from "./utils/repeat";

export const createTimeStretcher = (duration: number) => {
  return (pieceTable: PieceTable, meta: Metadata): PieceTable => {
    const result: PieceTable = [];
    const T0 = Math.floor(meta.sampleRate / meta.F0);
    const durationRatio = duration / meta.duration;

    if (durationRatio <= 1) {
      return pieceTable;
    }

    const R = Math.ceil(durationRatio * 10) % 10;
    const Q = (Math.ceil(durationRatio * 10) - R) / 10;

    loop: for (let group = 0; ; group += 10) {
      for (let i = 0; i < 10; i++) {
        if (group + i >= pieceTable.length) {
          break loop;
        }

        const [pieceIndex, locatedDelta] = pieceTable[group + i];
        result.push([pieceIndex, locatedDelta]);

        repeat(i < R ? Q + 1 : Q, () => {
          result.push([pieceIndex, T0]);
        });
      }
    }

    return result;
  };
};
