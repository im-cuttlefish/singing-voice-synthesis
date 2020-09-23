export const getVariance = (fn: number[]) => {
  return fn.reduce((S, y) => S + y ** 2, 0) / fn.length;
};
