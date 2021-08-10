import { Base } from './base.model';

export interface Order extends Base {
  productId: string;
  total: number;
  price: number;
}
