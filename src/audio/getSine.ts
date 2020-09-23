import { SignalSource, MonoralAudioData } from "./types";

interface Spec {
  sampleRate: number;
  frequency: number;
}

export const getSine = ({ sampleRate, frequency }: Spec): MonoralAudioData => {
  const source: SignalSource = function* () {
    for (let i = 0; ; i++) {
      yield Math.sin(2 * Math.PI * frequency * (i / sampleRate));
    }
  };

  return { type: "monoral", sampleRate, source };
};
