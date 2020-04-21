import { Pistachio } from '@/classes/units/Pistachio';
import { PistachioIll } from '@/classes/units/PistachioIll';
import { Bilberry } from '@/classes/units/Bilberry';

export class UnitFactory {
  public static createUnit(name: string, cellSize: number, x: number, y: number) {
    switch (name) {
      case 'Pistachio':
        return new Pistachio(cellSize, x, y);
      case 'PistachioIll':
        return new PistachioIll(cellSize, x, y);
      case 'Bilberry':
        return new Bilberry(cellSize, x, y);
      default:
        throw new Error(`INCORRECT UNIT CLASS NAME: ${name}`);
    }
  }
}
