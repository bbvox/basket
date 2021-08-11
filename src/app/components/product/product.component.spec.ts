import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductComponent } from './product.component';
import { OrderService, ProductService } from '@app/services';

import { Unit } from '@app/models';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const productIdMock = '11111';
  const productMock = {
    id: '11111',
    name: 'Test data',
    position: 1,
    available: true,
    price: 0.8,
    unit: Unit.LOAF,
  };
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let orderServiceMock: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', [
      'get',
      'getById',
    ]);
    orderServiceMock = jasmine.createSpyObj('OrderService', ['add', 'remove']);
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OrderService, useValue: orderServiceMock },
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = productMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check onAdd to basket', () => {
    productServiceMock.getById.and.returnValue(productMock);
    component.onAdd(productIdMock);

    expect(productServiceMock.getById).toHaveBeenCalledWith(productIdMock);
    expect(orderServiceMock.add).toHaveBeenCalledWith(productMock);
  });

  it('check onRemove from basket', () => {
    component.onRemove(productIdMock);
    expect(orderServiceMock.remove).toHaveBeenCalledWith(productIdMock);
  });
});
