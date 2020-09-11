import { AudioData } from "./types";
import { getAudioDataFromWaveFile } from "./wave/getAudioDataFromWaveFile";

export const getAudioData = async (blob: Blob): Promise<AudioData> => {
  if (!isWave(blob)) {
    throw new Error(`The MIME type "${blob.type}" is not supported.`);
  }

  const buffer = await blob.arrayBuffer();
  const view = new DataView(buffer);
  return getAudioDataFromWaveFile(view);
};

const isWave = ({ type }: Blob) => {
  return /^audio\/((wave?)|(x-(pn-)?wav))$/.test(type);
};
