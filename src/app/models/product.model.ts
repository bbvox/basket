import { Base } from './base.model';

export enum Unit {
  CAN = 'can',
  LOAF = 'loaf',
  BOTTLE = 'bottle',
  BAG = 'bag',
}

export interface Product extends Base {
  position: number;
  available: boolean;
  price: number;
  unit: Unit;
}
