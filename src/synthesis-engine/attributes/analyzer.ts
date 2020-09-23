import { createSTFTAnalyzer } from "@/calculation/signal-processing/createSTFTAnalyzer";
import { createWalker } from "@/calculation/window/createWalker";
import { hannWindow } from "@/calculation/window/hannWindow";

const walker = createWalker({
  size: 1024,
  frameShift: 256,
});

export const STFTAnalyzer = createSTFTAnalyzer({
  walker,
  window: hannWindow,
});

/*\
  const synthesisWindow: WindowFunction = (width) => {
    const hann = hannWindow(width);
    return (x) => 0.5 * hann(x);
  };

  export const ISTFTAnalyzer = createISTFTAnalyzer({
    walker,
    window: synthesisWindow,
  });
\*/
