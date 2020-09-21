import { PitchMark } from "../attributes/types";
import { SignalSegment } from "../calculation/types";
import { repeat } from "./utils/repeat";
import { SplittedForm } from "./types";
import { isWithIn } from "./utils/isWithIn";
import { getDelta } from "./utils/getDelta";

export const stretchDuration = (
  { pitchMark, T0, splitted }: SplittedForm,
  timeRatio: number
): SplittedForm => {
  const editedPitchMark: PitchMark = [];
  const editedSplitted: SignalSegment[] = [];
  const delta: number[] = getDelta(pitchMark);

  if (timeRatio > 1) {
    const R = Math.ceil(timeRatio * 10) % 10;
    const Q = (Math.ceil(timeRatio * 10) - R) / 10;
    let prev = 0;

    loop: for (let group = 0; ; group += 10) {
      for (let i = 0; i < 10; i++) {
        if (group + i >= pitchMark.length) {
          break loop;
        }

        const D = isWithIn(group + i - 1, delta) ? delta[group + i - 1] : 0;

        editedPitchMark.push(prev + D);
        editedSplitted.push(splitted[group + i]);
        prev += D;

        repeat(i < R ? Q + 1 : Q, () => {
          editedPitchMark.push(prev + T0);
          editedSplitted.push(splitted[group + i]);
          prev += T0;
        });
      }
    }

    return {
      T0,
      pitchMark: editedPitchMark,
      splitted: editedSplitted,
    };
  }

  const R = Math.ceil(timeRatio * 10);
  let prev = 0;

  loop: for (let group = 0; ; group += 10) {
    for (let i = 0; i < R; i++) {
      if (group + i >= pitchMark.length) {
        break loop;
      }

      editedPitchMark.push(prev + T0);
      editedSplitted.push(splitted[group + i]);
      prev += T0;
    }
  }

  return {
    T0,
    pitchMark: editedPitchMark,
    splitted: editedSplitted,
  };
};
