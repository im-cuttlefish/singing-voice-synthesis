import { SignalSource, StereoAudioData } from "./types";

export const getStereoAudioData = (buffer: ArrayBuffer): StereoAudioData => {
  const view = new DataView(buffer);
  const sampleRate = 44100;
  const offset = 44;
  const fileSize = view.getUint32(4, true) + 8;
  const dataSize = fileSize - offset;

  const left: SignalSource = function* () {
    for (let byte = 0; byte + 4 < dataSize; byte += 4) {
      yield normalize(view.getInt16(offset + byte, true));
    }
  };

  const right: SignalSource = function* () {
    for (let byte = 0; byte + 4 < dataSize; byte += 4) {
      yield normalize(view.getInt16(offset + byte + 2, true));
    }
  };

  return { type: "stereo", sampleRate, left, right };
};

const normalize = (x: number) => {
  const y = x / 32768;
  return y > 1 ? 1 : y < 0 ? 0 : y;
};
