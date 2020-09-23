import { MonoralAudioData } from "@/audio/types";
import { Attributes } from "./attributes/types";

interface Note {
  phoneme: string;
  F0: number;
  from: number;
  duration: number;
}

export type Corpus = {
  sampleRate: number;
  phonemes: {
    [key in string]?: {
      attributes: Attributes;
      audioData: MonoralAudioData;
    };
  };
};

export type Score = Note[];
