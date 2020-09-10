/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { STFTAnalyzer } from "./analyzer";
import { getCepstrumFromFrequency } from "./calculation/getCepstrumFromFrequency";
import { getOutlier } from "./calculation/getOutlier";
import { getMonoralAudioData } from "./audio/getMonoralAudioData";
import { createDisposer } from "./calculation/createDCDisposer";
import { graphVisualizer } from "./visualizer/graphVisualizer";
import { pointsVisualizer } from "./visualizer/pointsVisualizer";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;

const div = document.createElement("div");
app.appendChild(div);

const [canvas1, printGraph] = graphVisualizer({
  xAxis: 1024,
  yAxis: 300,
});

const [canvas2, printPoints] = pointsVisualizer({
  xAxis: 1024,
  yAxis: 300,
});

app.appendChild(canvas1);
app.appendChild(canvas2);

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = getMonoralAudioData(elementsMap.get("あ"));

  const left = audioData.source();
  const STFT = STFTAnalyzer();
  const disposeDC = createDisposer(3);
  let count = 0;

  const loop = () => {
    count += 1;
    const signal = left.next().value;

    if (signal === undefined) {
      return;
    }

    setTimeout(loop, 1);
    const frequency = STFT.next(signal).value;
    div.textContent = `${count / 44100}`;

    if (!frequency) {
      return;
    }

    const cepstrum = getCepstrumFromFrequency(frequency);
    const disposedCepstrum = disposeDC(cepstrum);
    const outlier = getOutlier(disposedCepstrum);
    printGraph(disposedCepstrum);
    printPoints(outlier);
  };

  loop();

  button?.addEventListener("click", async () => {
    /*\
      const audioBuffer = await context.decodeAudioData(elementsMap.get("あ"));
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start(0);
    \*/
  });
})();
