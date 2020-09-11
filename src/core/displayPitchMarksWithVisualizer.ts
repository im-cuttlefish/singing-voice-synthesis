import { MonoralAudioData } from "@/audio/types";
import { graphVisualizer } from "@/visualizer/graphVisualizer";
import { pointsVisualizer } from "@/visualizer/pointsVisualizer";
import { STFTAnalyzer } from "@/core/analyzer";
import { createBandpassFilter } from "@/calculation/createBandpassFilter";
import { createOutlierTester } from "@/calculation/createOutlierTester";
import { getCepstrumFromFrequency } from "@/calculation/getCepstrumFromFrequency";
import { takeMaximum } from "@/calculation/takeMaximum";

export const displayPitchMarksWithVisualizer = (
  audioData: MonoralAudioData,
  root: HTMLElement
) => {
  const div = document.createElement("div");
  const explanation = document.createElement("div");

  explanation.textContent =
    "数字は経過秒数、グラフはケプストラムの推移とそのピークを示す。";

  const [canvas1, printGraph] = graphVisualizer({
    xAxis: 1024,
    yAxis: 300,
  });

  const [canvas2, printPoints] = pointsVisualizer({
    xAxis: 1024,
    yAxis: 300,
  });

  root.appendChild(explanation);
  root.appendChild(div);
  root.appendChild(canvas1);
  root.appendChild(canvas2);

  let count = 0;
  const { sampleRate } = audioData;
  const source = audioData.source();
  const STFT = STFTAnalyzer();
  const bandpass = createBandpassFilter(Math.floor(sampleRate / 880), 512);
  const getOutlier = createOutlierTester(4);
  const pitchMarks: [number, number][] = [];

  const loop = () => {
    count += 1;
    const passedTime = count / audioData.sampleRate;
    const signal = source.next().value;

    if (signal === undefined) {
      console.log(JSON.stringify(pitchMarks, null, 1));
      return;
    }

    setTimeout(loop, 1);
    const frequency = STFT.next(signal).value;
    div.textContent = `${passedTime}`;

    if (!frequency) {
      return;
    }

    const cepstrum = getCepstrumFromFrequency(frequency);
    const cutCepstrum = bandpass(cepstrum);
    const outlier = getOutlier(cutCepstrum);
    const max = takeMaximum(cutCepstrum);

    console.log(sampleRate / max[0]);
    printGraph(cutCepstrum);
    printPoints(outlier);

    pitchMarks.push([passedTime, sampleRate / max[0]]);
  };

  loop();
};
