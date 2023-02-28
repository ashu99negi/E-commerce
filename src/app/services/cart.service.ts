import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any = [];
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any>('http://localhost:3000/cart').pipe(
      map((res: any) => {
        console.log('||||||||||', res);
        this.cartItems = res;
        return res;
      })
    );
  }

  addToCart(product: any) {
    // this.cartItems.push(product);
    console.log(this.cartItems);
    // this.productList.next(this.cartItems);
    // this.getTotalPrice();
    return this.http.post<any>('http://localhost:3000/cart', product).pipe(
      map((res: any) => {
        console.log(res, '*******');
        return res;
      })
    );
  }

  getTotalPrice() {
    let finalTotal = 0;
    this.cartItems.map((item: any) => {
      finalTotal = finalTotal + item.total;
      console.log(finalTotal, '*****');
    });

    return finalTotal;
  }
  deleteItem(id: number) {
    return this.http.delete<any>('http://localhost:3000/cart/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
