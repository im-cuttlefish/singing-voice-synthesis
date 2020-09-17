import { WaveFileInspector } from "./WaveFileInspector";
import { SignalSource, AudioData } from "../types";

export const getAudioDataFromWaveFile = (view: DataView): AudioData => {
  const inspector = new WaveFileInspector(view);

  if (!inspector.is16bitLPCM()) {
    throw new Error("This file is not 16bit LPCM.");
  }

  const offset = 44;
  const isMonoral = inspector.isMonoral();
  const datasize = inspector.getDataSize();
  const sampleRate = inspector.getSampleRate();

  const normalize = (x: number) => {
    const y = sampleRate === 44100 ? x / 32768 : (x - 128) / 128;
    return y > 1 ? 1 : y < -1 ? -1 : y;
  };

  if (isMonoral) {
    const source: SignalSource = function* () {
      for (let byte = 0; byte + 2 < datasize; byte += 2) {
        yield normalize(view.getInt16(offset + byte, true));
      }
    };

    return { type: "monoral", sampleRate, source };
  }

  const left: SignalSource = function* () {
    for (let byte = 0; byte + 4 < datasize; byte += 4) {
      yield normalize(view.getInt16(offset + byte, true));
    }
  };

  const right: SignalSource = function* () {
    for (let byte = 0; byte + 4 < datasize; byte += 4) {
      yield normalize(view.getInt16(offset + byte + 2, true));
    }
  };

  return { type: "stereo", sampleRate, left, right };
};
