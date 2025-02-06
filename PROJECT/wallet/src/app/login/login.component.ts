import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TokenModel } from '../modals/token-modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    NavbarComponent,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  destroyRef = inject(DestroyRef)
  loginForm = new FormGroup({
    username: new FormControl('', {
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
  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}
  //add validations - length, numeric
  loginFailed!: boolean;
  isLoading = false;
  onSubmit() {
    let formValues = this.loginForm.value;
    const username = formValues.username;
    const password = formValues.password;
    const mudraPin = Number(formValues.mudraPin);
    const formData = {
      username:username,
      entered_password:password,
      entered_mudra_pin:mudraPin
    }
    if (this.loginForm.invalid) {
      console.log(this.loginForm.controls.mudraPin.valid);
      console.log(this.loginForm.controls.username.valid);
      console.log(this.loginForm.controls.password.valid);
      this.messageService.add({
        severity: 'info',
        summary: 'Invalid Credentials',
        detail: 'Invalid credentials entered. Please try again',
      });
    } else {
      console.log(formData)
      this.isLoading=true;
      this.loginService.login(formData)
      .subscribe({
        next: (loginResponse:any) => {
          this.isLoading=false;
          console.log(loginResponse)
          this.messageService.add({
            severity: 'info',
            summary: 'Welcome',
            detail: 'Welcome. You have logged in successfully',
          });
          const access_token = loginResponse.access_token;
          localStorage.setItem('access_token', access_token);
          console.log(access_token);
          this.loginService.setLoginSuccessful();
          this.loginService.setUsername(username!);
          console.log(this.loginService.getUsername());
          console.log(this.loginService.getLoginSuccessful());
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.isLoading=false;
          this.messageService.add({
            severity: 'info',
            summary: 'Invalid Credentials',
            detail: 'Invalid credentials entered. Please try again',
          });
          this.loginForm.reset()
          console.log(err);
          return err;
        },
      });
    }
  }
}
