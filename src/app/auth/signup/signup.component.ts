import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // registeredUsers: any[] = localStorage.getItem('registeredUsers') || [];
  registeredUsers: any[] | null = [];
  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    // private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<SignupComponent>,
    private http:HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit(signUpForm: FormGroup) {
    // this.signuser = this.singup.value.fname;
    console.log(this.signUpForm.value,"*******");
    this.http.post<any>("http://localhost:3000/signup", this.signUpForm.value)
    .subscribe(res=>{
      alert('data added successfully');
      if (this.dialogRef) {
        this.dialogRef.close();
      }
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert('Somthing went wrong');
    });
  }

  navigateToLoginPage() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
