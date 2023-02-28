import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userData: any;
  totalItem: number = 0;
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/profile').subscribe((res) => {
      this.userData = res;
    });
    this.cartService.getProduct().subscribe((res: any) => {
      this.totalItem = res.length;
    });
  }
  logOut() {
    this.http
      .delete<any>('http://localhost:3000/profile/' + this.userData[0].id)
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigate(['/login']);
  }
}
