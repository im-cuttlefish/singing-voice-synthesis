import { Spectrum } from "../calculation/types";
import { Visualizer, Graph } from "./types";
import { takeMaximum } from "../calculation/takeMaximum";
import { applyDefaultRules } from "./applyDefaultRules";

export const graphVisualizer: Visualizer<Graph> = (rules) => {
  const $rules = applyDefaultRules(rules);
  const context = $rules.canvas.getContext("2d");

  if (context === null) {
    throw new Error("Cannot get the canvas's context.");
  }

  const normalizer = (graph: Graph): Graph => {
    if (!$rules.autoScale) {
      return graph;
    }

    const result: Spectrum = [];
    const max = takeMaximum(graph)[1];

    for (let i = 0; i < graph.length; i++) {
      result.push(($rules.yAxis * graph[i]) / max);
    }

    return result;
  };

  const drawGraph = (fn: Graph) => {
    const normalized = normalizer(fn);
    context.clearRect(0, 0, $rules.xAxis, $rules.yAxis);

    for (let x = 0; x < fn.length; x++) {
      context.fillRect(
        x * $rules.xScale,
        $rules.yAxis - $rules.yScale * normalized[x],
        $rules.xScale,
        $rules.yScale * normalized[x]
      );
    }
  };

  return [$rules.canvas, drawGraph];
};
