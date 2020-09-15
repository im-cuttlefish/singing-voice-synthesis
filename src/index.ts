/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import { TD_PSOLA } from "./TD_PSOLA";
import { PreAnalyzedSignalSegment } from "./types";
import { getAttributes } from "./attributes/getAttributes";

const button = document.getElementById("button")!;

(async () => {
  const elementsMap = await getSpeechElements();
  /*const audioData = await getAudioData(elementsMap.get("あ"));

  if (audioData.type !== "monoral") {
    return;
  }*/

  const aa: any = {};

  for (const [key, value] of elementsMap) {
    const audioData = await getAudioData(value);
    const attributes = getAttributes(audioData);
    aa[key] = attributes;
    console.log(`Done: ${key}`);
  }

  console.log(JSON.stringify(aa));

  /*\
    const { sampleRate } = audioData;
    const attributes = getAttributes(audioData);

    console.log(JSON.stringify(attributes));

    const segment: PreAnalyzedSignalSegment = {
      ...attributes,
      segment: [...audioData.source()],
    };

    const nextSource = TD_PSOLA(segment, { F0: 261.626 });

    button?.addEventListener("click", async () => {
      const context = new AudioContext();
      const buffer = context.createBuffer(1, nextSource.length, sampleRate);
      const channelData = buffer.getChannelData(0);

      for (let i = 0; i < nextSource.length; i++) {
        channelData[i] = nextSource[i];
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start();
    });
  \*/
})();
