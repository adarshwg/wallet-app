import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from './signup.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupModel } from '../modals/user-credentials-modals';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, NavbarComponent, ToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private signupService: SignupService,
    private messageService: MessageService,
    private router: Router,
    private loginService:LoginService
  ) {}
  signupForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    mudraPin: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ],
    }),
  });

  onSubmit() {
    let formValues = this.signupForm.value;
    const username = formValues.username;
    const email = formValues.email;
    const password = formValues.password;
    const mudraPin = Number(formValues.mudraPin);
    const formData: SignupModel = {
      username: username!,
      entered_password: password!,
      entered_email: email!,
      entered_mudra_pin: mudraPin!,
    };
    this.signupService.setSignupData(formData);
    if (this.signupForm.invalid) {
      console.log(this.signupForm.controls.mudraPin.valid);
      console.log(this.signupForm.controls.username.valid);
      console.log(this.signupForm.controls.password.valid);
      this.messageService.add({
        severity: 'info',
        summary: 'Invalid Credentials',
        detail: 'Invalid credentials entered. Please try again',
      });
    } else {
      console.log(formData);
      this.signupService.signup().subscribe({
        next: (signupResponse: any) => {
          console.log(signupResponse);
          this.messageService.add({
            severity: 'info',
            summary: 'Welcome',
            detail: 'Welcome. You have signed up successfully',
          });
          const access_token = signupResponse.access_token;
          localStorage.setItem('access_token', access_token);
          console.log(access_token);
          this.loginService.setLoginSuccessful();
          this.loginService.setUsername(username!);
          console.log(this.loginService.getUsername());
          console.log(this.loginService.getLoginSuccessful());
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Invalid Credentials',
            detail: 'Invalid credentials entered. Please try again',
          });
          this.signupForm.reset();
          console.log(err);
          return err;
        },
      });
    }
  }
}
