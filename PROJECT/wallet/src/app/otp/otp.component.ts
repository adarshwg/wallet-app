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
import { OTPModel, VerifyOTPModel } from '../modals/user-credentials-modals';
import { TokenModel } from '../modals/token-modal';

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
      next: (otpModel: OTPModel) => {
        this.otpService.setOtp(otpModel);
        console.log(otpModel);
      },
    });
  }
  onVerify() {
    this.otpService.verifyOTP(this.otpForm.value.otp!).subscribe({
      next: (verifyOTPResponse: VerifyOTPModel) => {
        console.log(verifyOTPResponse);
        if (verifyOTPResponse.status === 'success') {
          this.signupService.signup().subscribe({
            next: (verifyOTPResponse: TokenModel) => {
              console.log('heheheh')
              const access_token = verifyOTPResponse.access_token;
              localStorage.setItem('access_token', access_token);
              this.router.navigate(['home']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        } else {
          this.messageService.add(
            {
              severity:'error',
              summary:'Invalid OTP Entered! ',
              detail:'Entered OTP is invalid. Please try again.'
            }
          )
        }
      },
      error: (err) => {
        this.messageService.add(
          {
            severity:'error',
            summary:'OTP Expired! ',
            detail:'The OTP has expired. Please request a new OTP.'
          }
        )
        console.log(err)      
      }
    })
  }
}
  

