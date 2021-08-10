import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Product[]> {
    const url = 'assets/json/products.json';
    return this.httpClient
      .get<Product[]>(url)
      .pipe(tap((products) => (this.products = products)));
  }

  getById(productId: string): Product {
    return this.products.filter((product) => product.id === productId)[0];
  }
}
