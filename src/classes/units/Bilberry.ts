import image from '@/assets/img/units/bilberry.png';
import { DEFAULT_UNIT_SPEED, DEFAULT_UNIT_HEALTH } from '@/constants';
import { Unit } from './Unit';

export class Bilberry extends Unit {
  constructor(cellSize: number, x: number, y: number) {
    super({
      image,
      health: DEFAULT_UNIT_HEALTH * 1.3,
      speed: DEFAULT_UNIT_SPEED * 0.8,
      x,
      y,
    }, cellSize);
  }
}
