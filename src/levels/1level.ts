import roadImage from '@/assets/img/ground-1.jpg';
import { TMapsItem } from '@/types/TMapsItem';
import { TLevelDataset } from '@/types/TLevelDataset';

const unitsCount = 6;

export default {
  roadImage,
  roadMap: [
    { posX: 0, posY: 7 },
    { posX: 1, posY: 7 },
    { posX: 2, posY: 7 },
    { posX: 3, posY: 7 },
    { posX: 4, posY: 7 },
    { posX: 5, posY: 7 },
    { posX: 6, posY: 7 },
    { posX: 7, posY: 7 },
    { posX: 8, posY: 7 },
    { posX: 9, posY: 7 },
    { posX: 9, posY: 8 },
    { posX: 9, posY: 9 },
    { posX: 9, posY: 10 },
    { posX: 10, posY: 10 },
    { posX: 11, posY: 10 },
    { posX: 12, posY: 10 },
    { posX: 13, posY: 10 },
    { posX: 14, posY: 10 },
    { posX: 15, posY: 10 },
    { posX: 16, posY: 10 },
    { posX: 16, posY: 9 },
    { posX: 16, posY: 8 },
    { posX: 16, posY: 7 },
    { posX: 16, posY: 6 },
    { posX: 16, posY: 5 },
    { posX: 16, posY: 4 },
    { posX: 16, posY: 3 },
    { posX: 17, posY: 3 },
    { posX: 18, posY: 3 },
    { posX: 19, posY: 3 },
    { posX: 20, posY: 3 },
    { posX: 21, posY: 3 },
    { posX: 22, posY: 3 },
    { posX: 23, posY: 3 },
    { posX: 24, posY: 3 },
  ] as TMapsItem[],
  units: Array(unitsCount)
    .fill('Pistachio', 0, 3)
    .fill('PistachioIll', 3, unitsCount),
  spawnDelay: 6000, // ms
} as TLevelDataset;
