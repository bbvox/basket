import { Unit } from './product.model';

interface ByDate {
  endDate: number;
  unit: Unit;
}

interface ByQuantity {
  minimum: number;
  unit: Unit;
  discountUnit: Unit;
}

export interface Discount {
  type: 'date' | 'quantity';
  data: ByDate | ByQuantity;
  discount: number;
}
