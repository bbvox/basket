import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ConfigService } from '@app/core/config.service';
import { ProductService } from './product.service';
import { Product, Unit } from '@app/models';

describe('ProductService', () => {
  let service: ProductService;
  let result: Product[];
  let httpTestingController: HttpTestingController;
  const productIdMock = '11111';
  const resultsMock = [
    {
      id: '11111',
      name: 'Test data',
      position: 1,
      available: true,
      price: 0.8,
      unit: Unit.LOAF,
    },
  ];

  const configValue = {
    baseUrl: './url/',
    currency: 'GBP',
    currencySign: '&#163;',
  };
  const configService = jasmine.createSpyObj('ConfigService', ['getConfig']);
  configService.getConfig.and.returnValue(configValue);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: ConfigService, useValue: configService },
      ],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('expect http request with Product result', () => {
    service.get().subscribe((products) => (result = products));

    const req = httpTestingController.expectOne('./url/products.json');
    expect(req.request.method).toEqual('GET');
    req.flush(resultsMock);

    expect(result).toEqual(resultsMock);
  });

  it('expect to getById return exact product', () => {
    service.get().subscribe((products) => (result = products));

    const req = httpTestingController.expectOne('./url/products.json');
    req.flush(resultsMock);

    const product = service.getById(productIdMock);
    expect(product).toEqual(resultsMock[0]);
  });
});
