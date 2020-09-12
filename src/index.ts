/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import { TD_PSOLA } from "./TD_PSOLA";
import { PreAnalyzedSignalSegment } from "./types";
import { getPreAnalyzedData } from "./pre-analyze/getPreAnalyzedData";

const button = document.getElementById("button")!;

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("あ"));

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = audioData;
  const preAnalyzed = getPreAnalyzedData(audioData);

  const segment: PreAnalyzedSignalSegment = {
    ...preAnalyzed,
    segment: [...audioData.source()],
  };

  const nextSource = TD_PSOLA(segment, { F0: 261.626 });

  const context = new AudioContext();
  const buffer = context.createBuffer(1, nextSource.length, sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < nextSource.length; i++) {
    channelData[i] = nextSource[i];
  }

  button?.addEventListener("click", async () => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
  });
})();
