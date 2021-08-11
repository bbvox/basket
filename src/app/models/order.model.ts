import { Base } from './base.model';
import { Unit } from './product.model';

// priceRate - 100% - 10%discountRate = 90%
export interface Order extends Base {
  productId: string;
  total: number;
  price: number;
  priceRate?: number;
  unit: Unit;
  totalPrice?: number;
}
