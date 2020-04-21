export type TCanvasState = {
  el: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  offsetTop: number;
  interactiveCellSize: number;
}
