import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res;

      this.products.forEach((product: any) => {
        Object.assign(product, { quantity: 1, total: product.price });
      });
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe((res: any) => {
      console.log(res);
    });
    alert('Your Item is added to Cart');
    console.log(product);
    window.location.reload();
  }
}
