import level1 from '@/levels/1level';
import { TLevelDataset } from '@/types/TLevelDataset';

const levels: any = {
  1: level1,
};

function getLevelData(level: number) {
  return levels[level] as TLevelDataset;
}

export const levelsRepository = {
  get: getLevelData,
};
