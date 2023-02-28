import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  response: boolean = false;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    // private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: FormGroup) {
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.userName === this.loginForm.value.userName &&
            a.password === this.loginForm.value.password
          );
        });

        if (user) {
          this.http.post<any>("http://localhost:3000/profile", user)
          .subscribe(res=>{
          })
          this.router.navigate(['/products']);
          alert('you are successfully login');
        } else {
          alert('User Not Found');
        }
      },
      (err) => {
        alert('Something was wrong');
      }
    );
  }

  openSignup() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(SignupComponent, dialogConfig);
  }
}
