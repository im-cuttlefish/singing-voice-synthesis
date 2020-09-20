export type FadeFunction = (duration: number) => (x: number) => number;

export type Crossfader = () => Generator<number | null, void, [number, number]>;
