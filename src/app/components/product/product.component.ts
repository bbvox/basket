import { Component, Input } from '@angular/core';
import { Product } from '@app/models';
import { OrderService, ProductService } from '@app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: Product;

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  onAdd(productId: string) {
    const product = this.productService.getById(productId);
    console.log('add Product to basket : ', product);
    this.orderService.add(product);
  }

  onRemove(productId: string) {
    console.log('add Product to basket : ', productId);
    this.orderService.remove(productId);
  }
}
