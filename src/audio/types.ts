export type AudioData = StereoAudioData | MonoralAudioData;

export type SignalSource = () => Generator<number, void, void>;

export type StereoAudioData = {
  type: "stereo";
  sampleRate: number;
  left: SignalSource;
  right: SignalSource;
};

export type MonoralAudioData = {
  type: "monoral";
  sampleRate: number;
  source: SignalSource;
};
