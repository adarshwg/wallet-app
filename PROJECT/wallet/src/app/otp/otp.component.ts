import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OtpService } from './otp.service';
import { SignupService } from '../signup/signup.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otp',
  imports: [RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  constructor(
    private signupService: SignupService,
    private otpService: OtpService,
    private router: Router,
    private messageService: MessageService
  ) {}
  otpForm = new FormGroup({
    otp: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(6)],
    }),
  });
  email!: string;
  otpVerified = false;
  ngOnInit(): void {
    this.email = this.signupService.getEmail();
    console.log(this.signupService.getEmail());
    this.otpService.sendOTP(this.email).subscribe({
      next: (resData: any) => {
        this.otpService.setOtp(resData);
        console.log(resData);
      },
    });
  }
  onVerify() {
    this.otpService.verifyOTP(this.otpForm.value.otp!).subscribe({
      next: (resData: any) => {
        console.log(resData);
        if (resData.status === 'success') {
          this.signupService.signup().subscribe({
            next: (resData: any) => {
              const access_token = resData.access_token;
              localStorage.setItem('access_token', access_token);
              this.router.navigate(['home']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }
}
