import { Unit } from '@/classes/units/Unit';
import { TLevelDataset } from './TLevelDataset';

export type TLevelDesignerState = {
  levelNumber: number;
  levelDataset: TLevelDataset;
  units: Unit[];
  start: [number, number];
  assets: {
    road: HTMLImageElement;
  };
}
