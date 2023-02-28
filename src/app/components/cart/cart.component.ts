import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Array<any> = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
  this.authService.isLoggedIn();
   this.getCartItems();
  }

  getCartItems() {
    this.cartService.getProduct().subscribe((res: any) => {
      this.products = res;
      console.log(this.products.length); 
      this.totalPrice = this.cartService.getTotalPrice();
      console.log(this.totalPrice,"*******");
    })
  }

  removeItem(product: any) {
    console.log(product);
    
    this.cartService.deleteItem(product.id).subscribe((res) => {
      alert("Todo deleted");
      this.getCartItems();
      window.location.reload();
    });
  }
}
