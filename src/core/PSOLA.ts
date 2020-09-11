import { AudioData } from "@/audio/types";
import { PitchMark } from "./types";
import { WindowFunction } from "@/calculation/types";

interface PSOLARules {
  window: WindowFunction;
  audioData: AudioData;
  pitchMark: PitchMark;
}

export const PSOLA = ({ window, audioData, pitchMark }: PSOLARules) => {
  return null;
};
