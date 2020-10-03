/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import attributes from "./attributes.json";
import { createWaveFile } from "./audio/createWaveFile";
import { transform } from "./synthesis-engine/transform";
// import { createSongSynthesizer } from "./synthesis-engine/createSongSynthesizer";
import { Point } from "./calculation/utils/types";
import { CatmullRomSpline } from "./calculation/interpolation/createCatmullRomSpline";
import { hannWindow } from "./calculation/window/hannWindow";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;
const stop = document.getElementById("stop")!;

const link = document.createElement("a");
link.download = "true";
link.innerHTML = "Download";
app.appendChild(link);

const cvs = document.createElement("canvas");
cvs.width = 800;
cvs.height = 800;

const ctx = cvs.getContext("2d")!;
app.appendChild(cvs);

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("うぇ")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = attributes.うぇ;

  /*\
  const corpus: Corpus = {
    sampleRate: 44100,
    phonemes: {},
  };

  for (const [key, blob] of elementsMap) {
    const audioData = <MonoralAudioData>await getAudioData(blob);
    corpus.phonemes[key] = { audioData, attributes: attributes[key] };
  }
  \*/

  // const songSynthesizer = createSongSynthesizer(corpus);

  // const merged = songSynthesizer(song);

  const sample: Point[] = [];

  sample.push([-10, 350]);
  const hann = hannWindow(40);

  for (let i = 40; i < 80; i++) {
    let F0 = i % 2 ? -10 : 10;
    F0 = F0 * hann(i) + 350;
    sample.push([i / 10, F0]);
  }

  sample.push([10000, 350]);

  const interpolator = new CatmullRomSpline(sample);
  // interpolator.add([3, 200]);
  // interpolator.remove(0);
  // interpolator.replace(1, [2.5, 200]);

  for (let i = 0; i < 800; i++) {
    const y = interpolator.interpolate(i / 100);
    ctx.fillRect(i, 800 - y, 1, y);
  }

  for (const [x, y] of sample) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x * 100, 800 - y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  const merged = transform({
    F0Transition: interpolator.interpolate,
    duration: 10,
    attributes: attributes.うぇ,
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
