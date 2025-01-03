import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private otp?: string;
  setOtp(otp:string){
    this.otp = otp
  }
  constructor(private httpClient: HttpClient) {}
  verify(entered_otp: string) {
    console.log(entered_otp);
    console.log('otp generated is ', this.otp);
    if (entered_otp == this.otp) {
      console.log('entered _ otp', entered_otp, 'and ', this.otp);
      return true;
    } else return false;
  }
  sendOTP(email: string) {
    return this.httpClient.get('http://localhost:8000/otp/')
  }
}
