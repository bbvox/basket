import { Component, Input } from '@angular/core';
import { Product } from '@app/models';
import { ConfigService } from '@app/core/config.service';
import { OrderService, ProductService } from '@app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: Product;
  currencySign: string;
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private configService: ConfigService
  ) {
    this.currencySign = this.configService.getConfig().currencySign;
  }

  onAdd(productId: string) {
    const product = this.productService.getById(productId);
    this.orderService.add(product);
  }

  onRemove(productId: string) {
    this.orderService.remove(productId);
  }
}
