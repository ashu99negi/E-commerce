import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get('http://localhost:3000/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
