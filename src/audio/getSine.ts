import { SignalSource, MonoralAudioData } from "./types";

export const getSine = (frequency: number): MonoralAudioData => {
  const sampleRate = 44100;

  const source: SignalSource = function* () {
    for (let i = 0; ; i++) {
      yield Math.sin(2 * Math.PI * frequency * (i / sampleRate));
    }
  };

  return { type: "monoral", sampleRate, source };
};
