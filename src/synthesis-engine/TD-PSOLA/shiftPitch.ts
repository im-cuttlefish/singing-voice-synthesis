import { SignalSegment } from "../calculation/types";
import { SplittedForm } from "./types";

export const shiftPitch = (
  { splitted, pitchMark, T0 }: SplittedForm,
  T0Ratio: number
): SplittedForm => {
  const editedPitchMark: SignalSegment = [];
  const editedT0 = Math.floor(T0Ratio * T0);
  const m0 = pitchMark[0];

  for (let i = 0; i < pitchMark.length; i++) {
    const mark = Math.floor(T0Ratio * (pitchMark[i] - m0) + m0);
    editedPitchMark.push(mark);
  }

  return {
    splitted,
    T0: editedT0,
    pitchMark: editedPitchMark,
  };
};
