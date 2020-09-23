/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpeechElements } from "./speechElements";
import { getAudioData } from "./audio/getAudioDataFromFile";
import attributes from "./attributes.json";
import { createWaveFile } from "./audio/createWaveFile";
import { transform } from "./synthesis-engine/transform";
import { createSongSynthesizer } from "./synthesis-engine/createSongSynthesizer";
import { Corpus, Score } from "./synthesis-engine/types";
import { MonoralAudioData } from "./audio/types";
import temparament from "./temperament.json";

const app = document.getElementById("app")!;
const button = document.getElementById("button")!;
const stop = document.getElementById("stop")!;

const link = document.createElement("a");
link.download = "true";
link.innerHTML = "Download";
app.appendChild(link);

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
  const audioData = await getAudioData(elementsMap.get("で")!);

  if (audioData.type !== "monoral") {
    return;
  }

  const { sampleRate } = attributes.で;

  const corpus: Corpus = {
    sampleRate: 44100,
    phonemes: {},
  };

  for (const [key, blob] of elementsMap) {
    const audioData = <MonoralAudioData>await getAudioData(blob);
    corpus.phonemes[key] = { audioData, attributes: attributes[key] };
  }

  const songSynthesizer = createSongSynthesizer(corpus);

  const merged = songSynthesizer(song);

  /*\
    transform({
      F0: 400,
      duration: 20,
      attributes: attributes.で,
      audioData: audioData,
    });
  \*/

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
