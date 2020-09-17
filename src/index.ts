/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import { TD_PSOLA } from "./TD-PSOLA/TD_PSOLA";
import { SignalSegmentWithAttributes } from "./TD-PSOLA/types";
import attributes from "./attributes.json";
import { createWaveFile } from "./audio/createWaveFile";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;
const stop = document.getElementById("stop")!;

const link = document.createElement("a");
link.download = "true";
link.innerHTML = "Download";
app.appendChild(link);

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("お")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = audioData;

  const segment: SignalSegmentWithAttributes = {
    ...attributes.お,
    segment: [...audioData.source()],
  };

  const nextSource = TD_PSOLA(segment, {
    F0: 400,
    duration: 10,
  });

  link.href = URL.createObjectURL(
    createWaveFile({ segment: nextSource, sampleRate })
  );

  let source: AudioBufferSourceNode;

  button?.addEventListener("click", async () => {
    const context = new AudioContext();
    const buffer = context.createBuffer(1, nextSource.length, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < nextSource.length; i++) {
      channelData[i] = nextSource[i];
    }

    source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    source.start();
  });

  stop?.addEventListener("click", () => {
    source.stop();
  });
})();
