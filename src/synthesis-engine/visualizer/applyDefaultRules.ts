import { VisualizerRules } from "./types";

export const applyDefaultRules = (rules: VisualizerRules) => {
  const normalized: Required<VisualizerRules> = {
    canvas: rules.canvas || document.createElement("canvas"),
    xScale: 1,
    yScale: 1,
    autoScale: true,
    ...rules,
  };

  if (normalized.autoScale) {
    normalized.yScale = 1;
  }

  normalized.canvas.width = rules.xAxis;
  normalized.canvas.height = rules.yAxis;

  return normalized;
};
