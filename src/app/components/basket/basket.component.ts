import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Order } from '@app/models';

import { OrderService } from '@app/services';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders$ = this.orderService.getAsObservable();
  }

}
