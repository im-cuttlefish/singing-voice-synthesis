export const getMean = (fn: number[]) => {
  return fn.reduce((S, y) => S + y) / fn.length;
};
