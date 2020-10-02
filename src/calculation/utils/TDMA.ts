import type { TDMatrix } from "./types";

export const TDMA = (coefficient: TDMatrix, right: number[]) => {
  const N = coefficient.length;
  const P: number[] = [];
  const Q: number[] = [];
  const X: number[] = [];

  const [a, b] = coefficient[0];
  const d = right[0];

  P[0] = -b / a;
  Q[0] = d / a;

  for (let i = 1; i < N; i++) {
    const [c, a, b] = coefficient[i];
    const d = right[i];

    P[i] = -b / (a + c * P[i - 1]);
    Q[i] = (d - c * Q[i - 1]) / (a + c * P[i - 1]);
  }

  X[N - 1] = Q[N - 1];

  for (let i = N - 2; i >= 0; i--) {
    X[i] = P[i] * X[i + 1] + Q[i];
  }

  return X;
};
