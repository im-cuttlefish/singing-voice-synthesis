export const isWithIn = (x: number, fn: number[]) => {
  return 0 <= x && x < fn.length;
};
