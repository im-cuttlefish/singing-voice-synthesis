import { indexOf } from "*.png";
import { prod, cis, add, sub } from "../utils/complex";
import { SignalSegment, Frequency } from "./types";

export const FFT = (fn: SignalSegment): Frequency => {
  const frequency: Frequency = [];
  const digits = get2radixDigits(fn.length);

  for (let i = 0; i < fn.length; i++) {
    const operation: ("even" | "odd")[] = [];
    let k = i;

    for (let j = 0; j < digits; j++) {
      if (isEven(k)) {
        operation.push("even");
        k /= 2;
      } else {
        operation.push("odd");
        k = (k - 1) / 2;
      }
    }

    for (let j = 0; j < digits; j++) {
      null;
    }
  }

  return frequency;
};

const isEven = (x: number) => (x & 1) === 0;

const get2radixDigits = (x: number) => {
  let y = x;

  for (let i = 0; ; i++) {
    if (y === 1) {
      return i;
    }

    y /= 2;
  }
};
