/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import attributes from "./attributes.json";
import { createWaveFile } from "./audio/createWaveFile";
import { transform } from "./synthesis-engine/transform";
// import { createSongSynthesizer } from "./synthesis-engine/createSongSynthesizer";
import { Corpus, Score } from "./synthesis-engine/types";
import { MonoralAudioData } from "./audio/types";
import temparament from "./temperament.json";
import { createLinearInterpolator } from "./calculation/interpolation/createLinearInterpolator";
import { createCubicSpline } from "./calculation/interpolation/createCubicSpline";
import { Point } from "./calculation/utils/types";
import { getAttributes } from "./synthesis-engine/attributes/getAttributes";
import { CatmullRomSpline } from "./calculation/interpolation/createCatmullRomSpline";

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

const unit = 60 / 80;

const song: Score = [
  {
    phoneme: "き",
    F0: temparament.C4,
    from: 0,
    duration: unit,
  },
  {
    phoneme: "ら",
    F0: temparament.C4,
    from: unit,
    duration: unit,
  },
  {
    phoneme: "き",
    F0: temparament.G4,
    from: 2 * unit,
    duration: unit,
  },
  {
    phoneme: "ら",
    F0: temparament.G4,
    from: 3 * unit,
    duration: unit,
  },
  {
    phoneme: "ひ",
    F0: temparament.A4,
    from: 4 * unit,
    duration: unit,
  },
  {
    phoneme: "か",
    F0: temparament.A4,
    from: 5 * unit,
    duration: unit,
  },
  {
    phoneme: "る",
    F0: temparament.G4,
    from: 6 * unit,
    duration: 2 * unit,
  },
  {
    phoneme: "お",
    F0: temparament.F4,
    from: 8 * unit,
    duration: unit,
  },
  {
    phoneme: "そ",
    F0: temparament.F4,
    from: 9 * unit,
    duration: unit,
  },
  {
    phoneme: "ら",
    F0: temparament.E4,
    from: 10 * unit,
    duration: unit,
  },
  {
    phoneme: "の",
    F0: temparament.E4,
    from: 11 * unit,
    duration: unit,
  },
  {
    phoneme: "ほ",
    F0: temparament.D4,
    from: 12 * unit,
    duration: unit,
  },
  {
    phoneme: "し",
    F0: temparament.D4,
    from: 13 * unit,
    duration: unit,
  },
  {
    phoneme: "よ",
    F0: temparament.C4,
    from: 14 * unit,
    duration: 2 * unit,
  },
];

(async () => {
  const elementsMap = await getSpeechElements();
  const audioData = await getAudioData(elementsMap.get("が")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = attributes.で;

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

  const sample: Point[] = [
    [1, 340],
    [2, 500],
    [4, 340],
    [6, 360],
    [7, 400],
  ];

  const interpolator = new CatmullRomSpline(sample);
  interpolator.add([3, 200]);
  // interpolator.remove(0);
  // interpolator.replace(1, [2.5, 200]);
  const bib = (t: number) => 350 + 10 * Math.sin(10 * Math.PI * t);

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
    F0Transition: bib,
    duration: 10,
    attributes: attributes.が,
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
