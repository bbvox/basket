import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { Order, Product, Unit } from '@app/models';

describe('OrderService', () => {
  let service: OrderService;
  const productMock: Product = {
    id: '11111',
    name: 'Test product',
    position: 1,
    available: true,
    price: 0.8,
    unit: Unit.LOAF,
  };
  const productDiscountMock: Product = {
    id: '11112',
    name: 'Test product with discount',
    position: 1,
    available: true,
    price: 0.8,
    unit: Unit.BAG,
  };
  const ordersExpect: Order[] = [
    {
      id: '22222-1',
      name: 'Test product',
      productId: '11111',
      price: 0.8,
      unit: Unit.LOAF,
      total: 1,
      priceRate: 100,
      totalPrice: 0.8,
    },
  ];
  const ordersDiscountExpect = [
    {
      id: '22222-1',
      name: 'Test product with discount',
      productId: '11112',
      price: 0.8,
      unit: Unit.BAG,
      total: 1,
      priceRate: 90,
      totalPrice: 0.72,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Product to Orders without discount', () => {
    service.add(productMock);

    service.getAsObservable().subscribe((orders) => {
      expect(orders).toEqual(ordersExpect);
      expect(orders[0].priceRate).toEqual(100);
    });
  });

  it('should add Product to Orders with discount', () => {
    service.add(productDiscountMock);

    service.getAsObservable().subscribe((orders) => {
      expect(orders).toEqual(ordersDiscountExpect);
      expect(orders[0].priceRate).toEqual(90);
    });
  });

  it('should add new Product to Orders with discount', () => {
    service.add(productMock);
    service.add(productDiscountMock);

    service.getAsObservable().subscribe((orders) => {
      expect(orders).toEqual([
        ...ordersExpect,
        { ...ordersDiscountExpect[0], id: '22222-2' },
      ]);
    });
  });

  it('should increment total and totalPrice - existing product', () => {
    service.add(productDiscountMock);
    service.add(productDiscountMock);

    service.getAsObservable().subscribe((orders) => {
      const ordersExpect = [
        { ...ordersDiscountExpect[0], total: 2, totalPrice: 1.44 },
      ];
      expect(orders).toEqual(ordersExpect);
      expect(orders[0].priceRate).toEqual(90);
    });
  });
});
