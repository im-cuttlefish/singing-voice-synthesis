import { Point } from "../utils/types";

export type Interpolator = (points: Point[]) => (x: number) => number;
