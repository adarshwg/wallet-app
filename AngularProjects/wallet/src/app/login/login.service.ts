import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSuccessful = false;
  username! :string;
  constructor(private httpClient: HttpClient) {}
  login(formData: FormData) {
    console.log('here 2')
    return this.httpClient.post('http://localhost:8000/auth/login', formData)
  }
  getLoginSuccessful(){
    return this.loginSuccessful
  }
  setLoginSuccessful(){
    this.loginSuccessful = true;
  }
  getUsername(){
    return this.username
  }
  setUsername(username:string){
    this.username = username
  }
}
