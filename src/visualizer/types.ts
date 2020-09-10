export type Visualizer<T> = (
  rules: VisualizerRules
) => [HTMLCanvasElement, (x: T) => void];

interface VisualizerRules {
  canvas?: HTMLCanvasElement;
  xAxis: number;
  yAxis: number;
  xScale?: number;
  yScale?: number;
  autoScale?: boolean;
}

export type Point = [number, number];
export type Graph = number[];
