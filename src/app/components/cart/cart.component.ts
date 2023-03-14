import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
  // this.authService.isLoggedIn();
   this.getCartItems();
  }

  getCartItems() {
    this.cartService.getProduct().subscribe((res: any) => {
      this.products = res;
      console.log(this.products); 
      this.totalPrice = this.cartService.getTotalPrice();
      console.log(this.totalPrice,"*******");
    })
  }

  removeItem(product: Product) {
    debugger;
    this.cartService.deleteItem(product.id).subscribe((res) => {
      console.log(res,"res");
      this.getCartItems();
      // window.location.reload();
    });
  }
}
