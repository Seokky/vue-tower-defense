import level1 from '@/levels/1level';

const levels: any = {
  1: level1,
};

function getLevelData(level: number) {
  return levels[level];
}

export const levelsRepository = {
  get: getLevelData,
};
