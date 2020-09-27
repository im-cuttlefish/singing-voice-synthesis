export const createBinarySearch = <T>(cond: (x: T) => boolean) => {
  return (arg: T[]) => {
    let NG = -1;
    let OK = arg.length;

    while (Math.abs(OK - NG) > 1) {
      const median = Math.floor((OK + NG) / 2);

      if (cond(arg[median])) {
        OK = median;
      } else {
        NG = median;
      }
    }

    return OK;
  };
};
