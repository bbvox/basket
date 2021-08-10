import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@app/models';
import { ProductService } from '@app/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.get();
  }
}
