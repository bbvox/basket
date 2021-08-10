import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Order, Product } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders$ = new BehaviorSubject([]);
  constructor() {}

  public getAsObservable(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  public add(product: Product) {
    const orders = this.getValue();
    const orderIdx = orders.findIndex(
      (order) => order.productId === product.id
    );

    if (orderIdx !== -1) {
      orders[orderIdx].total++;
    } else {
      orders.push(this.convertToOrder(product, orders.length));
    }

    this.orders$.next(orders);
  }

  public remove(productId: string) {
    let orders = this.getValue();
    const orderIdx = orders.findIndex((order) => order.productId === productId);
    if (orderIdx === -1) return;

    if (orders[orderIdx].total > 1) {
      orders[orderIdx].total--;
    } else {
      orders = orders.filter((order) => order.productId !== productId);
    }
    this.orders$.next(orders || []);
  }

  // convert product to order
  private convertToOrder(product: Product, ordersLength: number) {
    const { id: productId, name, price } = product;
    return {
      id: '22222-' + (ordersLength + 1),
      name,
      productId,
      price,
      total: 1,
    };
  }

  private getValue(): Order[] {
    return this.orders$.getValue();
  }

  public getPrice() {}

  // this week
  private discountByDate() {}
  
  // 
  private discountByQuantity() {}

  // return number of discount
  private discountByType() {}
}
