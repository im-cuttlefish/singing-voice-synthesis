import { SignalSource, MonoralAudioData } from "./types";

export const getMonoralAudioData = (buffer: ArrayBuffer): MonoralAudioData => {
  const view = new DataView(buffer);
  const sampleRate = 44100;
  const offset = 44;
  const fileSize = view.getUint32(4, true) + 8;
  const dataSize = fileSize - offset;

  const source: SignalSource = function* () {
    for (let byte = 0; byte + 2 < dataSize; byte += 2) {
      yield normalize(view.getInt16(offset + byte, true));
    }
  };

  return { type: "monoral", sampleRate, source };
};

const normalize = (x: number) => {
  const y = x / 32768;
  return y > 1 ? 1 : y < 0 ? 0 : y;
};
