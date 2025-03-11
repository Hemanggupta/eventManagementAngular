import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;
  hidePass = true;
  hideConfirmPass = true;
  isLoginMode = true;

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.fb.group({
      userName: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();

    const controlsToToggle = ['confirmPassword', 'userName'];

    controlsToToggle.forEach(control => {
      if (!this.isLoginMode) {
        this.authForm.get(control)?.setValidators([Validators.required]);
      } else {
        this.authForm.get(control)?.clearValidators();
      }
      this.authForm.get(control)?.updateValueAndValidity();
    });
  }

  passwordMismatch(): boolean {
    if (!this.authForm.get('password')?.value || !this.authForm.get('confirmPassword')?.value) {
      return false;
    }
    return this.authForm.get('password')?.value !== this.authForm.get('confirmPassword')?.value;
  }

  private login(formData: any): void {
    this.loginService.login(formData.userEmail, formData.password).subscribe(users => {
      if (users.length > 0) {
        this.loginService.loginUser(users[0]); // Store user token
      } else {
        this.authForm.get('password')?.setErrors({ invalidCredentials: true });
      }
    });
  }

  private signUp(formData: any): void {
    this.loginService.checkEmail(formData.userEmail).subscribe(users => {
      if (users.length > 0) {
        this.authForm.get('userEmail')?.setErrors({ emailExists: true });
      } else {
        this.createUser(formData);
      }
    });
  }

  private createUser(formData: any): void {
    const newUser = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      password: formData.password
    };

    this.loginService.signup(newUser).subscribe(response => {
      this.isLoginMode = true;
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formData = this.authForm.value;

      if (this.isLoginMode) {
        this.login(formData);
      } else {
        this.signUp(formData);
      }
    }
  }
}
