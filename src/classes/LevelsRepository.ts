import level1 from '@/levels/1level';
import { TLevelDataset } from '@/types/TLevelDataset';

const levels = {
  1: level1,
} as { [name: string]: TLevelDataset };

function getLevelData(level: number) {
  return levels[level] as TLevelDataset;
}

export const levelsRepository = {
  get: getLevelData,
};
