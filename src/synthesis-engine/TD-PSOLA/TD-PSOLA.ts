import { createPitchShifter } from "./createPitchShifter";
import { createTimeStretcher } from "./createTimeStretcher";
import { getCorpusMetadata } from "./getCorpusMetadata";
import { createPieces } from "./createPieces";
import { createPieceTable } from "./createPieceTable";
import { OLA } from "./OLA";
import { CorpusItem, F0Transition, Metadata, PieceTable } from "./types";

interface Transform {
  F0Transition: F0Transition;
  duration: number;
}

export const TD_PSOLA = (
  corpusItem: CorpusItem,
  { F0Transition, duration }: Transform
) => {
  const CSize = Math.floor(COccupancy * corpusItem.pitchMark.length);

  const meta = getCorpusMetadata(corpusItem);
  const CMeta = { ...meta, duration: COccupancy * meta.duration };
  const VMeta = { ...meta, duration: (1 - COccupancy) * meta.duration };

  const pieceTable = createPieceTable(corpusItem.pitchMark);
  const CTable = pieceTable.slice(0, CSize);
  const VTable = pieceTable.slice(CSize);

  const maxF0 = getMaxF0(meta, pieceTable, F0Transition);
  const shiftPitch = createPitchShifter(F0Transition);
  const stretchTime = createTimeStretcher(duration * (maxF0 / corpusItem.F0));

  const editedCTable = shiftPitch(CTable, CMeta);
  const editedVTable = shiftPitch(stretchTime(VTable, VMeta), VMeta);
  const mergedTable = [...editedCTable, ...editedVTable];

  const pieces = createPieces(corpusItem);
  const signal = OLA({ pieces, pieceTable: mergedTable });

  return signal;
};

const getMaxF0 = (
  { sampleRate }: Metadata,
  pieceTable: PieceTable,
  F0Transition: F0Transition
) => {
  let passed = 0;
  let maxF0 = 0;

  for (let i = 0; i < pieceTable.length; i++) {
    const locatedDelta = pieceTable[i][1];
    const progress = locatedDelta / sampleRate;
    const F0 = F0Transition(passed + progress);

    maxF0 = F0 > maxF0 ? F0 : maxF0;
    passed += progress;
  }

  return maxF0;
};

const COccupancy = 0.3;
