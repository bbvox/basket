import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '@app/models';
import { ConfigService } from '@app/core/config.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  get(): Observable<Product[]> {
    const config = this.configService.getConfig();
    const url = `${config.baseUrl}products.json`;
    return this.httpClient
      .get<Product[]>(url)
      .pipe(tap((products) => (this.products = products)));
  }

  getById(productId: string): Product {
    return this.products.filter((product) => product.id === productId)[0];
  }
}
