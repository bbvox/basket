import { Base } from './base.model';

export enum Unit {
  CAN = 'can',
  LOAF = 'loaf',
  BOTTLE = 'bottle',
  BAG = 'bag',
}

export interface Product extends Base {
  description: string;
  position: number;
  available: boolean;
  price: number;
  currency: string;
  unit: Unit;
}
