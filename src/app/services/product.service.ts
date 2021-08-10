import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Product[]> {
    const url = 'assets/json/products.json';
    return this.httpClient.get<Product[]>(url);
  }
}
