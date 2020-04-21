import image from '@/assets/img/units/pistachio-ill.png';
import { DEFAULT_UNIT_SPEED, DEFAULT_UNIT_HEALTH } from '@/constants';
import { Unit } from './Unit';

export class PistachioIll extends Unit {
  constructor(cellSize: number, x: number, y: number) {
    super({
      image,
      health: DEFAULT_UNIT_HEALTH / 2,
      speed: DEFAULT_UNIT_SPEED * 1.1,
      x,
      y,
    }, cellSize);
  }
}
