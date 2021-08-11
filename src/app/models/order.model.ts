import { Base } from './base.model';
import { Unit } from './product.model';

export interface Order extends Base {
  productId: string;
  total: number;
  price: number;
  unit: Unit;
  discount?: number;
  totalPrice?: number;
}
