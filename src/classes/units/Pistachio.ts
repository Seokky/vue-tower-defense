import image from '@/assets/img/units/pistachio.png';
import { Unit } from './Unit';

export class Pistachio extends Unit {
  constructor(cellSize: number, x: number, y: number) {
    super({ image, x, y }, cellSize);
  }
}
