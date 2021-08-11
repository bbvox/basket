import { Unit } from './product.model';

export enum DiscountType {
    DATE = 'date',
    QUANTITY = 'quantity',
  }

interface ByDate {
  endDate: number;
  unit: Unit;
}

interface ByQuantity {
  minimum: number;
  unit: Unit;
  requiredUnit: Unit;
}

export interface Discount {
  type: DiscountType;
  byDate?: ByDate;
  byQuantity?: ByQuantity;
  discountRate: number;
}
