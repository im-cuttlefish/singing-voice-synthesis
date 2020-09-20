import { Visualizer, Point } from "./types";
import { takeMaximum } from "../calculation/takeMaximum";
import { applyDefaultRules } from "./applyDefaultRules";

export const pointsVisualizer: Visualizer<Point[]> = (rules) => {
  const $rules = applyDefaultRules(rules);
  const context = $rules.canvas.getContext("2d");

  if (context === null) {
    throw new Error("Cannot get the canvas's context.");
  }

  const normalizer = (points: Point[]): Point[] => {
    if (!$rules.autoScale) {
      return points;
    }

    const result: Point[] = [];
    const max = takeMaximum(points);

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      result.push([x, ($rules.yAxis * y) / max[1]]);
    }

    return result;
  };

  const drawPoints = (points: Point[]) => {
    const normalized = normalizer(points);
    context.clearRect(0, 0, $rules.xAxis, $rules.yAxis);

    for (let i = 0; i < normalized.length; i++) {
      const [x, y] = normalized[i];
      context.fillRect(
        x * $rules.xScale,
        $rules.yAxis - $rules.yScale * y,
        $rules.xScale,
        y * $rules.yScale
      );
    }
  };

  return [$rules.canvas, drawPoints];
};
