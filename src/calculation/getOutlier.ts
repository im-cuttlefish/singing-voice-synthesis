type Point = [number, number];

export const getOutlier = (f: number[]) => {
  const outlier: Point[] = [];
  const mean = getMeen(f);
  const SD = Math.sqrt(getVariance(f));

  const isOutlier = (y: number) => {
    return (y - mean) / SD > 4;
  };

  for (let x = 0; x < f.length; x++) {
    if (isOutlier(f[x])) {
      outlier.push([x, f[x]]);
    }
  }

  return outlier;
};

const getMeen = (f: number[]) => {
  return f.reduce((S, y) => S + y) / f.length;
};

const getVariance = (f: number[]) => {
  return f.reduce((S, y) => S + y ** 2, 0) / f.length;
};
