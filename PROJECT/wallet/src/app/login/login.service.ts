import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { LoginURL } from '../endpoints/auth-endpoints';
import { TokenModel } from '../modals/token-modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSuccessful = false;
  username! :string;
  constructor(private httpClient: HttpClient) {}
  login(formData: FormData): Observable<TokenModel>{
    return this.httpClient.post<TokenModel>(LoginURL, formData)
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
