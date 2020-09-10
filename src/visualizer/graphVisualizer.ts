import { Spectrum } from "@/calculation/types";
import { Visualizer, Graph } from "./types";

export const graphVisualizer: Visualizer<Graph> = ({
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

  const normalizer = (graph: Graph): Graph => {
    if (!autoScale) {
      return graph;
    }

    const result: Spectrum = [];
    let max = 0;

    for (let i = 0; i < graph.length; i++) {
      if (max < graph[i]) {
        max = graph[i];
      }
    }

    for (let i = 0; i < graph.length; i++) {
      result.push((yAxis * graph[i]) / max);
    }

    return result;
  };

  const drawGraph = (fn: Graph) => {
    const normalized = normalizer(fn);
    context.clearRect(0, 0, xAxis, yAxis);

    for (let x = 0; x < fn.length; x++) {
      context.fillRect(
        x * xScale,
        yAxis - yScale * normalized[x],
        xScale,
        yScale * normalized[x]
      );
    }
  };

  return [canvas, drawGraph];
};
