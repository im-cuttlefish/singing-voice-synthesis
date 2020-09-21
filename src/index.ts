/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./synthesis-engine/audio/getAudioDataFromFile";
import attributes from "./attributes.json";
import { createWaveFile } from "./synthesis-engine/audio/createWaveFile";
import { transform } from "./synthesis-engine/transform/transform";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;
const stop = document.getElementById("stop")!;

const link = document.createElement("a");
link.download = "true";
link.innerHTML = "Download";
app.appendChild(link);

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("ば")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = attributes.ば;

  const merged = transform({
    F0: 400,
    duration: 10,
    attributes: attributes.ば,
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
