import { createPitchShifter } from "./createPitchShifter";
import { createTimeStretcher } from "./createTimeStretcher";
import { getCorpusMetadata } from "./getCorpusMetadata";
import { createPieces } from "./createPieces";
import { createPieceTable } from "./createPieceTable";
import { OLA } from "./OLA";
import { CorpusItem } from "./types";

interface Transform {
  F0: number;
  duration: number;
}

export const TD_PSOLA = (
  corpusItem: CorpusItem,
  { F0, duration }: Transform
) => {
  const shiftPitch = createPitchShifter(F0);
  const stretchTime = createTimeStretcher(duration * (F0 / corpusItem.F0));
  const CSize = Math.floor(COccupancy * corpusItem.pitchMark.length);

  const meta = getCorpusMetadata(corpusItem);
  const CMeta = { ...meta, duration: COccupancy * meta.duration };
  const VMeta = { ...meta, duration: (1 - COccupancy) * meta.duration };

  const pieceTable = createPieceTable(corpusItem.pitchMark);
  const CTable = pieceTable.slice(0, CSize);
  const VTable = pieceTable.slice(CSize);

  const editedCTable = shiftPitch(CTable, CMeta);
  const editedVTable = shiftPitch(stretchTime(VTable, VMeta), VMeta);
  const mergedTable = [...editedCTable, ...editedVTable];

  const pieces = createPieces(corpusItem);
  const signal = OLA({ pieces, pieceTable: mergedTable });

  return signal;
};

const COccupancy = 0.3;
