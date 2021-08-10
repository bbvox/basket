import { Base } from './base.model';

export interface Product extends Base {
  description: string;
  available: boolean;
  position: number;
  price: number;
  currency: string;
}
