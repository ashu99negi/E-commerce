import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('it should check the username', () => {
    let userName = component.loginForm.controls['userName'];
    expect(userName.valid).toBeFalsy();
    expect(userName.errors!['required']).toBeTruthy();
  });

  fit('it should set the username', () => {
    let userName = component.loginForm.controls['userName'];
    userName.setValue('userName');
    expect(userName.valid).toBeTruthy();
    expect(userName.value).toEqual('userName');
  })
});
