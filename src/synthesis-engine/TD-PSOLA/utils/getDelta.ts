export const getDelta = (fn: number[]) => {
  const delta: number[] = [];

  for (let i = 0; i < fn.length - 1; i++) {
    delta.push(fn[i + 1] - fn[i]);
  }

  return delta;
};
