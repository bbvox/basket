import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '@app/models';

import { OrderService, ProductService } from '@app/services';
import { ConfigService } from '@app/core/config.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  orders$: Observable<Order[]>;
  currencySign: string;
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private configService: ConfigService
  ) {
    this.currencySign = this.configService.getConfig().currencySign;
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getAsObservable();
  }

  onAdd(productId: string) {
    const product = this.productService.getById(productId);
    this.orderService.add(product);
  }

  onRemove(productId: string) {
    this.orderService.remove(productId);
  }
}
