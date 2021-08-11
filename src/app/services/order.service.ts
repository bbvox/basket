import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { Discount, Order, Product, Unit } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders$ = new BehaviorSubject([]);
  private discounts: Discount[] = [
    {
      type: 'date',
      data: {
        unit: Unit.BAG,
        endDate: 1628937070000,
      },
      discount: 0.1,
    },
    {
      type: 'quantity',
      data: {
        unit: Unit.CAN,
        minimum: 2,
        discountUnit: Unit.LOAF,
      },
      discount: 0.5,
    },
  ];
  constructor() {}

  public getAsObservable(): Observable<Order[]> {
    return this.orders$.asObservable().pipe(
      map((orders) => this.mapperDiscount(orders)),
      map(this.mapperTotalPrice)
    );
    // .pipe(map(this.mapperDiscountByDate), map(this.mapperTotalPrice));
  }

  private mapperDiscount(orders) {
    return orders.map(this.discountByDate);
  }

  // toDo can be dynamic
  discountByDate(order) {
    const orderWithDiscount = { ...order };

    console.log('.....')

    if (order.unit === Unit.BAG) {
      orderWithDiscount.discount = 0.9;
    } else {
      orderWithDiscount.discount = 1;
    }
    return orderWithDiscount;
  }

  private discountByType(order) {
    console.log('... byType : ', order);
    return order;
  }

  private mapperDiscountByDate(orders: Order[]): Order[] {
    console.log('...ORDER :', orders);
    return orders.map((order) => order);
  }

  private mapperTotalPrice(orders: Order[]): Order[] {
    const round2decimal = (floatNum) => Math.round(floatNum * 100) / 100;
    console.log('...ORDER :', orders);
    return orders.map((order) => ({
      ...order,
      totalPrice: round2decimal(order.price * order.discount * order.total),
    }));
    // return {
    //   ...order,
    //   totalPrice: order.price * order.total,
    // };
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
    const { id: productId, name, price, unit } = product;
    return {
      id: '22222-' + (ordersLength + 1),
      name,
      productId,
      price,
      unit,
      total: 1,
    };
  }

  private getValue(): Order[] {
    return this.orders$.getValue();
  }

  // this week

  //

  // return number of discount
  // private discountByType() {}
}
