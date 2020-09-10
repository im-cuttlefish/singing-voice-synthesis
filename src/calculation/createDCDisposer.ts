type Disposer = (f: number[]) => number[];

export const createDisposer = (count: number): Disposer => {
  const pad = Array(count).fill(0);
  return (f) => [...pad, ...f.slice(count, -count), ...pad];
};
