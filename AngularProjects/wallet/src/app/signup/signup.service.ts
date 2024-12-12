import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupSuccessful$ = new BehaviorSubject<boolean>(false); 
  private username$ = new BehaviorSubject<string>('')
  constructor(private httpClient: HttpClient, private zone: NgZone) {}
  private signup(formData: FormData) {
    this.httpClient.post('http://localhost:8000/auth/signup', formData).subscribe({
      next: (resData: any) => {
        if (resData.access_token) {
          localStorage.setItem('access_token', resData.access_token);
          this.signupSuccessful$.next(true);
          let signup_username = String(formData.get("username"))
          this.username$.next(signup_username)
          console.log(this.username$.getValue())
        }
      },
      error: () => {
        this.zone.run(() => {
          this.signupSuccessful$.next(false); 
        });
      },
    });
  }

  getSignupStatus(formData: FormData) {
    this.signup(formData); 
    return this.signupSuccessful$.asObservable(); 
  }
}
