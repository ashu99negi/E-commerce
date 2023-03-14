import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: Array<any> = [];
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isAutheticated = this.authService.isLoggedIn();
    console.log(isAutheticated, 't////////////////f');

    if (!isAutheticated) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return isAutheticated;
    }
  }
}
