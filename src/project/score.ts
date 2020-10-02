type Note = {
  phoneme: string;
  F0: number;
  area: [number, number];
};

type Score = Note[];

type LayerModeBase = {
  name: string;
  parameters: Record<string, unknown>;
};

type Multiple = LayerModeBase & {
  name: "multiple";
  parameters: {
    depth: number;
    compression: number;
  };
};

type EffectFunctionBase = {
  name: string;
  area: [number, number];
  parameters: Record<string, unknown>;
};

type Sinus = EffectFunctionBase & {
  name: "sinus";
  parameters: {
    amplitude: number;
    frequency: number;
    initialPhase: number;
  };
};

type CubicSpline = EffectFunctionBase & {
  name: "sinus";
  parameters: {
    controlPoints: [number, number][];
  };
};

type Compression = EffectFunctionBase & {
  name: "compression";
  parameters: {
    compression: number;
  };
};

type EffectFunction = Sinus | CubicSpline;

export type Project = {
  meta: {
    version: string;
    lastModified: string;
  };
  score: Score;
  effects: [EffectFunction][];
};
