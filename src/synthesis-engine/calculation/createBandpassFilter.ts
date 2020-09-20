type Filter = (f: number[]) => number[];

export const createBandpassFilter = (from: number, morf: number): Filter => {
  const leftPad = Array(from).fill(0);
  const rightPad = Array(morf).fill(0);

  return (f) => [...leftPad, ...f.slice(from, -morf), ...rightPad];
};
