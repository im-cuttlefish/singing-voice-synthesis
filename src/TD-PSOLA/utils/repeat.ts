export const repeat = (count: number, fn: (...x: unknown[]) => unknown) => {
  for (let i = 0; i < count; i++) {
    fn();
  }
};
