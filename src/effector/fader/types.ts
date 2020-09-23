export interface FaderRules {
  fader: FadeFunction;
  duration: number;
}

export type FadeFunction = (duration: number) => (x: number) => number;

export type Crossfader = () => Generator<number | null, void, [number, number]>;

export type Fader = () => Generator<number | null, void, number>;
