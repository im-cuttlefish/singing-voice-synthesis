import { Visualizer, Point } from "./types";

export const pointsVisualizer: Visualizer<Point[]> = ({
  canvas,
  xAxis,
  yAxis,
  xScale = 1,
  yScale = 1,
  autoScale = true,
}) => {
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = xAxis;
    canvas.height = yAxis;
  }

  if (autoScale) {
    yScale = 1;
  }

  const context = canvas.getContext("2d");

  if (context === null) {
    throw new Error("Cannot get the canvas's context.");
  }

  const normalizer = (points: Point[]): Point[] => {
    if (!autoScale) {
      return points;
    }

    const result: Point[] = [];
    let max = 0;

    for (let i = 0; i < points.length; i++) {
      if (max < points[i][1]) {
        max = points[i][1];
      }
    }

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      result.push([x, (yAxis * y) / max]);
    }

    return result;
  };

  const drawPoints = (points: Point[]) => {
    const normalized = normalizer(points);
    context.clearRect(0, 0, xAxis, yAxis);

    for (let i = 0; i < normalized.length; i++) {
      const [x, y] = normalized[i];
      context.fillRect(x * xScale, yAxis - yScale * y, xScale, y * yScale);
    }
  };

  return [canvas, drawPoints];
};
