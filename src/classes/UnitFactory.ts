import { Pistachio } from '@/classes/units/Pistachio';
import { PistachioIll } from '@/classes/units/PistachioIll';

const units = {
  pistachio: Pistachio,
  pistachioIll: PistachioIll,
} as any;

function getUnit(name: string) {
  return units[name];
}

export const unitFactory = {
  get: getUnit,
};
