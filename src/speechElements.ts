import あ from "@/speech-elements/_あ.wav";
import い from "@/speech-elements/_い.wav";
import う from "@/speech-elements/_う.wav";
import sin100 from "@/speech-elements/sin-100Hz.wav";
import sin315 from "@/speech-elements/sin-315Hz.wav";
import sin400 from "@/speech-elements/sin-400Hz.wav";

interface ReadonlyMap<K, V> {
  readonly size: number;
  forEach(
    fn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    self?: unknown
  ): void;
  get(key: K): V;
  has(key: K): boolean;
}

const names = ["あ", "い", "う", "sin-100", "sin-315", "sin-400"] as const;
const urls = [あ, い, う, sin100, sin315, sin400];

type SpeechElementName = typeof names[number];
type SpeechElementsMap = ReadonlyMap<SpeechElementName, ArrayBuffer>;

export const getSpeechElements = async () => {
  const responses = await Promise.all(urls.map((x) => fetch(x)));
  const arrayBuffers = await Promise.all(responses.map((x) => x.arrayBuffer()));
  return <SpeechElementsMap>new Map(arrayBuffers.map((x, i) => [names[i], x]));
};
