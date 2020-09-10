import { createSTFTAnalyzer } from "./calculation/createSTFTAnalyzer";
import { createISTFTAnalyzer } from "./calculation/createISTFTAnalyzer";
import { createWalker } from "./calculation/createWalker";
import { hannWindow } from "./calculation/hannWindow";
import { WindowFunction } from "./calculation/types";

const walker = createWalker({
  size: 1024,
  frameShift: 256,
});

const synthesisWindow: WindowFunction = (width) => {
  const hann = hannWindow(width);
  return (x) => 0.5 * hann(x);
};

export const STFTAnalyzer = createSTFTAnalyzer({
  walker,
  window: hannWindow,
});

export const ISTFTAnalyzer = createISTFTAnalyzer({
  walker,
  window: synthesisWindow,
});
