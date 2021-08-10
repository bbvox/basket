import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private products;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .get()
      .subscribe((products) => (this.products = products));
  }
}
