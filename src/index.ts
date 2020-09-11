/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import { getPitchMark } from "./core/getPitchMark";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = document.getElementById("app")!;
const button = document.getElementById("button")!;

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("あ"));

  if (audioData.type !== "monoral") {
    return;
  }

  const pitchMark = getPitchMark(audioData);
  console.log(pitchMark);

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
