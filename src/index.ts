/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./synthesis-engine/audio/getAudioDataFromFile";
import { SignalSegmentWithAttributes } from "./synthesis-engine/TD-PSOLA-v1/types";
import attributes from "./attributes.json";
import { createWaveFile } from "./synthesis-engine/audio/createWaveFile";
import { transform } from "./synthesis-engine/transformer/transform";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;
const stop = document.getElementById("stop")!;

const link = document.createElement("a");
link.download = "true";
link.innerHTML = "Download";
app.appendChild(link);

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("ぎ")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = audioData;

  const merged = transform({
    F0: 250,
    duration: 10,
    attributes: attributes.ぎ,
    audioData: audioData,
  });

  link.href = URL.createObjectURL(
    createWaveFile({ segment: merged, sampleRate })
  );

  let source: AudioBufferSourceNode;

  button?.addEventListener("click", async () => {
    const context = new AudioContext();
    const buffer = context.createBuffer(1, merged.length, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < merged.length; i++) {
      channelData[i] = merged[i] || 0;
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
