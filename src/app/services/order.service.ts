import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { Discount, DiscountType, Order, Product, Unit } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders$ = new BehaviorSubject([]);
  private discounts: Discount[] = [
    {
      type: DiscountType.DATE,
      byDate: {
        unit: Unit.BAG,
        endDate: 1628937070000,
      },
      discountRate: 10,
    },
    {
      type: DiscountType.QUANTITY,
      byQuantity: {
        unit: Unit.LOAF,
        minimum: 2,
        requiredUnit: Unit.CAN,
      },
      discountRate: 50,
    },
  ];
  constructor() {}

  public getAsObservable(): Observable<Order[]> {
    return this.orders$.asObservable().pipe(
      map((orders) => this.mapperDiscount(orders)),
      map(this.mapperTotalPrice)
    );
  }

  // extend orders dataset with priceRate 100 || 100 - discountRate
  private mapperDiscount(orders) {
    return orders
      .map((order) => this.discountByDate(order))
      .map((order) => this.discountByType(order));
  }

  discountByDate(order) {
    const discountData = this.getDiscount(DiscountType.DATE);
    const { unit, endDate } = discountData.byDate;
    const today = new Date().getTime();
    let priceRate = order.priceRate || 100;

    if (order.unit === unit && today < endDate) {
      priceRate = 100 - discountData.discountRate;
    }

    return {
      ...order,
      priceRate,
    };
  }

  // from all Orders looks for requiredUnit
  private discountByType(order) {
    const discountData = this.getDiscount(DiscountType.QUANTITY);
    const { requiredUnit, unit, minimum } = discountData.byQuantity;
    let priceRate = order.priceRate || 100;

    if (order.unit === unit) {
      const orders = this.getValue();
      const required = orders.filter((order) => order.unit === requiredUnit);

      if (required?.length && required[0].total >= minimum) {
        priceRate = 100 - discountData.discountRate;
      }
    }

    return {
      ...order,
      priceRate,
    };
  }

  // currently support only one discount per type
  private getDiscount(type: DiscountType): Discount {
    return this.discounts.filter(
      (discountItem) => discountItem.type === type
    )[0];
  }

  private mapperTotalPrice(orders: Order[]): Order[] {
    // toDo export as utils
    const round2decimal = (floatNum) => Math.round(floatNum * 100) / 100;
    return orders.map((order) => ({
      ...order,
      totalPrice:
        round2decimal(order.price * (order.priceRate / 100)) * order.total,
    }));
  }

  public add(product: Product): void {
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

  public remove(productId: string): void {
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

  // convert product => order
  private convertToOrder(product: Product, ordersLength: number): Order {
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
}
