import { Unit } from '@/classes/units/Unit';

export type TLevelDesignerState = {
  levelNumber: number;
  units: Unit[];
  start: [number, number];
  assets: {
    road: HTMLImageElement;
  };
}
