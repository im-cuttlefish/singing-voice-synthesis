import type { Complex } from "./types";

export const cis = (theta: number): Complex => {
  return [Math.cos(theta), Math.sin(theta)];
};

export const sigma = (from: number, by: number, fn: (i: number) => Complex) => {
  const result: Complex = [0, 0];

  for (let i = from; i <= by; i++) {
    const z = fn(i);
    result[0] += z[0];
    result[1] += z[1];
  }

  return result;
};

export const abs = ([x, y]: Complex) => {
  return Math.sqrt(x ** 2 + y ** 2);
};

export const prod = ([x, y]: Complex, [u, v]: Complex): Complex => {
  return [x * u - y * v, x * v + u * y];
};

export const add = ([x, y]: Complex, [u, v]: Complex): Complex => {
  return [x + u, y + v];
};

export const sub = ([x, y]: Complex, [u, v]: Complex): Complex => {
  return [x - u, y - v];
};

export const div = ([x, y]: Complex, [u, v]: Complex): Complex => {
  const A = abs([u, v]);
  return [(x * u + y * v) / A, (y * u - x * v) / A];
};

export const toComplex = (x: number): Complex => {
  return [x, 0];
};
