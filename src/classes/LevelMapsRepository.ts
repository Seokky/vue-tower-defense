import level1 from '@/levelMaps/1level';

const levelMaps: any = {
  1: level1,
};

function getLevelMaps(level: number) {
  return levelMaps[level];
}

export const mapsRepository = {
  get: getLevelMaps,
};
