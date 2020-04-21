export type TUnitState = {
  health: number;
  speed: number;
  image: {
    width: number;
    height: number;
    el: null | HTMLImageElement;
    src: string;
  };
  x: number;
  y: number;
}
