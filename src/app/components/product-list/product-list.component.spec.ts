import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '@app/services';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let productServiceMock: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit called get', () => {
    component.ngOnInit();

    expect(productServiceMock.get).toHaveBeenCalled();
  });

});
