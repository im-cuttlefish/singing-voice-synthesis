export const createBinarySearch = <T>(cond: (x: T) => boolean) => {
  return (arg: T[]) => {
    let NG = -1;
    let OK = arg.length;

    while (Math.abs(OK - NG) > 1) {
      const mid = Math.floor((OK + NG) / 2);

      if (cond(arg[mid])) {
        OK = mid;
      } else {
        NG = mid;
      }
    }

    return OK;
  };
};
