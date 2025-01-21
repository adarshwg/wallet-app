import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { SendOTPURL, VerifyOTPURL } from '../endpoints/otp-endpoints';
import { OTPModel, VerifyOTPModel } from '../modals/user-credentials-modals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private otpHash?: OTPModel;
  setOtp(otpHash:OTPModel){
    this.otpHash = otpHash
  }
  constructor(private httpClient: HttpClient) {}
  verify(entered_otp: string) {
    if (entered_otp == this.otpHash) {
      return true;
    } else return false;
  }
  verifyOTP(entered_otp:string) : Observable<VerifyOTPModel>{
    return this.httpClient.post<VerifyOTPModel>(VerifyOTPURL,{
      "entered_otp" :  entered_otp,
      "otp_token" : this.otpHash
    })
  }
  sendOTP(email: string): Observable<OTPModel> {
    return this.httpClient.get<OTPModel>(SendOTPURL)
  }
}
