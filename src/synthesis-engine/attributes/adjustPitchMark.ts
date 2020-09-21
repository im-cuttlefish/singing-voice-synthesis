import { PitchMark } from "./types";
import { Point } from "../calculation/types";
import { OLS } from "../calculation/OLS";

export const adjustPitchMark = (pitchMark: PitchMark) => {
  const correctPitchMark: PitchMark = [];
  const points: Point[] = [];

  for (let i = 0; i < pitchMark.length; i++) {
    points.push([i, pitchMark[i]]);
  }

  const [A, B] = OLS(points);

  for (let i = 0; i < pitchMark.length; i++) {
    correctPitchMark[i] = Math.floor(A * i + B);
  }

  return correctPitchMark;
};
