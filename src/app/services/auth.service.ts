import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Array<any> = [];
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean{
    this.http.get<any>('http://localhost:3000/profile').subscribe((res) => {
      this.user = res;
      console.log(this.user,"response!!!!!!!!!");
    });
    if(this.user.length === 0) {
      return false;
    }
    else {
      return true;
    }

}
}