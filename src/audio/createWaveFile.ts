import { SignalSegment } from "@/calculation/types";

interface Props {
  segment: SignalSegment;
  sampleRate: number;
}

export const createWaveFile = ({ segment, sampleRate }: Props) => {
  const filesize = 2 * segment.length + 44;
  const chunksize = filesize - 8;
  const blocksize = 2;
  const mean = sampleRate * blocksize;

  const arrayBuffer = new ArrayBuffer(filesize);
  const view = new DataView(arrayBuffer);

  view.setInt32(0, bin("RIFF"), true);
  view.setInt32(4, chunksize, true);
  view.setInt32(8, bin("WAVE"), true);
  view.setInt32(12, bin("fmt "), true);
  view.setInt32(16, 16, true);
  view.setInt16(20, 1, true);
  view.setInt16(22, 1, true);
  view.setInt32(24, sampleRate, true);
  view.setInt32(28, mean, true);
  view.setInt16(32, blocksize);
  view.setInt16(34, 16, true);
  view.setInt32(36, bin("data"), true);
  view.setInt32(40, filesize - 44, true);

  for (let i = 0; i < segment.length; i++) {
    const signal = unnormalize(segment[i]);
    view.setInt16(44 + 2 * i, signal, true);
  }

  return new Blob([view.buffer], { type: "audio/wav" });
};

const bin = (x: string) => {
  let result = "";

  for (let i = x.length - 1; i >= 0; i--) {
    result += x.charCodeAt(i).toString(16);
  }

  return parseInt(result, 16);
};

const unnormalize = (x: number) => {
  const y = Math.floor(x * 0.6 * 32767);
  return y > 32767 ? 32767 : y < -32768 ? -32768 : y;
};
